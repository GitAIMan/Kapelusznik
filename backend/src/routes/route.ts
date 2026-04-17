import { Router } from "express";
import type { Request, Response } from "express";
import { z } from "zod";

const router = Router();

const ORS_BASE = "https://api.openrouteservice.org";

// Cel: siedziba kolektywu — Bielsko-Biała (przybliżony środek miasta)
const DESTINATION = { lat: 49.8225, lng: 19.0444, label: "Bielsko-Biała" };

const routeSchema = z.object({
  origin: z.string().min(3, "Adres zbyt krótki").max(200, "Adres zbyt długi"),
}).strict();

router.post("/", async (req: Request, res: Response) => {
  const apiKey = process.env.ORS_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: "Serwis tymczasowo niedostępny" });
    return;
  }

  const parsed = routeSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Nieprawidłowy adres" });
    return;
  }

  const { origin } = parsed.data;

  try {
    // 1) Geocoding: adres → koordynaty
    const geocodeUrl = new URL(`${ORS_BASE}/geocode/search`);
    geocodeUrl.searchParams.set("api_key", apiKey);
    geocodeUrl.searchParams.set("text", origin);
    geocodeUrl.searchParams.set("boundary.country", "PL");
    geocodeUrl.searchParams.set("size", "1");

    const geoRes = await fetch(geocodeUrl.toString());
    if (!geoRes.ok) {
      res.status(503).json({ error: "Nie udało się zlokalizować adresu" });
      return;
    }
    const geoData: any = await geoRes.json();
    const feature = geoData.features?.[0];
    if (!feature) {
      res.status(400).json({ error: "Nie znaleziono podanego adresu" });
      return;
    }
    const [lng, lat] = feature.geometry.coordinates as [number, number];
    const label: string = feature.properties?.label || origin;

    // 2) Directions: start → Bielsko-Biała
    const dirRes = await fetch(
      `${ORS_BASE}/v2/directions/driving-car/geojson`,
      {
        method: "POST",
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coordinates: [
            [lng, lat],
            [DESTINATION.lng, DESTINATION.lat],
          ],
        }),
      }
    );

    if (!dirRes.ok) {
      res.status(503).json({ error: "Nie udało się wyznaczyć trasy" });
      return;
    }

    const dirData: any = await dirRes.json();
    const route = dirData.features?.[0];
    if (!route) {
      res.status(400).json({ error: "Trasa niedostępna" });
      return;
    }

    const summary = route.properties?.summary || route.properties?.segments?.[0];
    const distanceM = summary?.distance ?? 0;
    const durationS = summary?.duration ?? 0;

    res.json({
      distance_km: +(distanceM / 1000).toFixed(1),
      duration_min: Math.round(durationS / 60),
      from: { lat, lng, label },
      to: DESTINATION,
      geometry: route.geometry?.coordinates || [],
    });
  } catch (err) {
    console.error("Route error:", err);
    res.status(503).json({ error: "Błąd serwisu mapowego" });
  }
});

export default router;
