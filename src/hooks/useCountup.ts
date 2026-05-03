import { useEffect, useRef, useState } from "react";
import { useWebHaptics } from "web-haptics/react";

export function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number>(0);
  const { trigger } = useWebHaptics();

  useEffect(() => {
    startTime.current = null;
    trigger([{ duration: 1000 }], { intensity: 1 });
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [target, duration]);

  return value;
}
