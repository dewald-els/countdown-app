import { Toaster } from '@/components/ui/sonner';
import { CountdownDisplay } from '@/components/CountdownDisplay';

const COUNTDOWN_EVENT = {
  id: 'main',
  name: 'The Big Day',
  targetDate: '2026-08-06T00:00:00',
  createdAt: new Date().toISOString(),
  notified: false,
};

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl text-center">
          {/* Event Name */}
          <h1 className="text-2xl md:text-4xl font-medium text-muted-foreground mb-2">
            {COUNTDOWN_EVENT.name}
          </h1>
          
          {/* Target Date */}
          <p className="text-sm md:text-base text-muted-foreground/60 mb-8">
            {new Date(COUNTDOWN_EVENT.targetDate).toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          {/* Countdown Display */}
          <CountdownDisplay
            countdown={COUNTDOWN_EVENT}
            onNotified={() => {}}
          />
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
