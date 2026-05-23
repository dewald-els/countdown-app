import { useState, useEffect, useCallback } from 'react';
import type { Countdown } from '@/types/countdown';

const STORAGE_KEY = 'countdown-app-data';

export function useCountdowns() {
  const [countdowns, setCountdowns] = useState<Countdown[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(countdowns));
  }, [countdowns]);

  const addCountdown = useCallback((name: string, targetDate: string) => {
    const newCountdown: Countdown = {
      id: crypto.randomUUID(),
      name,
      targetDate,
      createdAt: new Date().toISOString(),
    };
    setCountdowns((prev) => [...prev, newCountdown]);
  }, []);

  const removeCountdown = useCallback((id: string) => {
    setCountdowns((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const markNotified = useCallback((id: string) => {
    setCountdowns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, notified: true } : c))
    );
  }, []);

  return {
    countdowns,
    addCountdown,
    removeCountdown,
    markNotified,
  };
}
