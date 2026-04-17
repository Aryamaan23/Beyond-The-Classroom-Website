import { useEffect, useState, useRef } from 'react';

export const useCounterAnimation = (
  end: number,
  duration: number = 2000,
  start: boolean = false
): number => {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Ease-out cubic function for smooth, natural animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOut * (end - startValue) + startValue);
      
      setCount(currentCount);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    // Cleanup function to cancel animation on unmount
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, duration, start]);

  return count;
};
