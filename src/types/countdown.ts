export interface Countdown {
  id: string;
  name: string;
  targetDate: string;
  createdAt: string;
  notified?: boolean;
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}
