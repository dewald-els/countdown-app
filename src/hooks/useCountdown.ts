import { useState, useEffect, useCallback } from 'react';
import type { Countdown } from '@/types/countdown';

const STORAGE_KEY = 'countdown-app-data';

export function useCountdown() {
  const [countdown, setCountdown] = useState<Countdown | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (countdown) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(countdown));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [countdown]);

  const setCountdownEvent = useCallback((name: string, targetDate: string) => {
    const newCountdown: Countdown = {
      id: crypto.randomUUID(),
      name,
      targetDate,
      createdAt: new Date().toISOString(),
    };
    setCountdown(newCountdown);
  }, []);

  const clearCountdown = useCallback(() => {
    setCountdown(null);
  }, []);

  const markNotified = useCallback(() => {
    setCountdown((prev) => prev ? { ...prev, notified: true } : null);
  }, []);

  return {
    countdown,
    setCountdown: setCountdownEvent,
    clearCountdown,
    markNotified,
  };
}
