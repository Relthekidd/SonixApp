import { useState, useRef } from 'react';

interface SwipeConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  swipeThreshold?: number;
}

export function useSwipeCards({ onSwipeLeft, onSwipeRight, swipeThreshold = 100 }: SwipeConfig) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setOffsetX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(offsetX) > swipeThreshold) {
      if (offsetX > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (offsetX < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    }

    setOffsetX(0);
  };

  return {
    elementRef,
    isDragging,
    offsetX,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}
