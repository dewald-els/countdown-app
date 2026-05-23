import { useState, useEffect } from 'react';
import type { TimeRemaining } from '@/types/countdown';

export function useTimeRemaining(targetDate: string): TimeRemaining {
  const calculateTime = (): TimeRemaining => {
    const total = new Date(targetDate).getTime() - Date.now();
    
    if (total <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    return {
      days: Math.floor(total / (1000 * 60 * 60 * 24)),
      hours: Math.floor((total / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((total / (1000 * 60)) % 60),
      seconds: Math.floor((total / 1000) % 60),
      total,
    };
  };

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(calculateTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeRemaining;
}
