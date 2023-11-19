import { useState, useEffect } from "react";

type CursorPosition = {
  x: number;
  y: number;
};

export const useCursorTracker = (
  targetRef: React.RefObject<HTMLDivElement>
) => {
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (targetRef.current) {
      const bounds: DOMRect = targetRef.current.getBoundingClientRect();
      const centerX: GLfloat = bounds.width / 2;
      const centerY: GLfloat = bounds.height / 2;
      const x: number = e.clientX - bounds.left - centerX;
      const y: number = e.clientY - bounds.top - centerY;
      const target = e.target as HTMLElement;

      setCursorPos({ x, y });
    }
  };

  const handleMouseLeave = (e: MouseEvent) => {
    setCursorPos({ x: 0, y: 0 });
  };

  useEffect(() => {
    const targetElement: HTMLDivElement | null = targetRef.current;
    if (targetElement) {
      targetElement.addEventListener("mousemove", handleMouseMove);
      targetElement.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        targetElement.removeEventListener("mousemove", handleMouseMove);
        targetElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [targetRef]);

  return cursorPos;
};
