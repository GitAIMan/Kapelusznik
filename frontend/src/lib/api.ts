const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return res.json();
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export function apiGet(path: string, token?: string) {
  return request(path, token ? { headers: authHeaders(token) } : {});
}

export function apiPost(path: string, body: unknown, token?: string) {
  return request(path, {
    method: "POST",
    body: JSON.stringify(body),
    ...(token ? { headers: authHeaders(token) } : {}),
  });
}

export function apiPut(path: string, body: unknown, token?: string) {
  return request(path, {
    method: "PUT",
    body: JSON.stringify(body),
    ...(token ? { headers: authHeaders(token) } : {}),
  });
}

export function apiDelete(path: string, token?: string) {
  return request(path, {
    method: "DELETE",
    ...(token ? { headers: authHeaders(token) } : {}),
  });
}

export async function apiUpload(file: File, token: string) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return res.json();
}
