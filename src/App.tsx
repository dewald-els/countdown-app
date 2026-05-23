import { useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { CountdownForm } from '@/components/CountdownForm';
import { CountdownCard } from '@/components/CountdownCard';
import { EmptyState } from '@/components/EmptyState';
import { useCountdowns } from '@/hooks/useCountdowns';

function App() {
  const { countdowns, addCountdown, removeCountdown, markNotified } = useCountdowns();

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Sort countdowns: active first (by target date), then expired
  const sortedCountdowns = [...countdowns].sort((a, b) => {
    const aExpired = new Date(a.targetDate).getTime() <= Date.now();
    const bExpired = new Date(b.targetDate).getTime() <= Date.now();
    
    if (aExpired && !bExpired) return 1;
    if (!aExpired && bExpired) return -1;
    
    return new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime();
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Countdown
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your important events
          </p>
        </header>

        <CountdownForm onAdd={addCountdown} />

        {countdowns.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {sortedCountdowns.map((countdown) => (
              <CountdownCard
                key={countdown.id}
                countdown={countdown}
                onDelete={removeCountdown}
                onNotified={markNotified}
              />
            ))}
          </div>
        )}
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
