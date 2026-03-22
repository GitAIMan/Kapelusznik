"use client";

import { useState, useRef, useCallback } from "react";

export function useDisciplineWheel(itemCount: number) {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDragging = useRef(false);
  const lastAngle = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const getAngle = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      lastAngle.current = getAngle(e.clientX, e.clientY);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [getAngle]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const currentAngle = getAngle(e.clientX, e.clientY);
      const delta = currentAngle - lastAngle.current;
      setRotation((prev) => prev + delta);
      lastAngle.current = currentAngle;
    },
    [getAngle]
  );

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const selectDiscipline = useCallback(
    (index: number) => {
      setActiveIndex(index);
      const targetAngle = -(index * (360 / itemCount));
      setRotation(targetAngle);
    },
    [itemCount]
  );

  return {
    rotation,
    activeIndex,
    containerRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    selectDiscipline,
  };
}
