import { useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { CountdownForm } from '@/components/CountdownForm';
import { CountdownDisplay } from '@/components/CountdownDisplay';
import { useCountdown } from '@/hooks/useCountdown';
import { X } from 'lucide-react';

function App() {
  const { countdown, setCountdown, clearCountdown, markNotified } = useCountdown();

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {countdown ? (
          <div className="w-full max-w-4xl text-center">
            {/* Event Name */}
            <h1 className="text-2xl md:text-4xl font-medium text-muted-foreground mb-2">
              {countdown.name}
            </h1>
            
            {/* Target Date */}
            <p className="text-sm md:text-base text-muted-foreground/60 mb-8">
              {new Date(countdown.targetDate).toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>

            {/* Countdown Display */}
            <CountdownDisplay
              countdown={countdown}
              onNotified={markNotified}
            />

            {/* Reset Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCountdown}
              className="mt-12 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-md text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Countdown
            </h1>
            <p className="text-muted-foreground mb-12">
              Set a date and watch the time tick away
            </p>
            <CountdownForm onSubmit={setCountdown} />
          </div>
        )}
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
