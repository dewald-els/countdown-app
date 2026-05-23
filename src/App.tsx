import { Toaster } from '@/components/ui/sonner';
import { CountdownDisplay } from '@/components/CountdownDisplay';

const COUNTDOWN_EVENT = {
  id: 'main',
  name: 'The Big Day',
  targetDate: '2026-08-06T00:00:00',
  createdAt: '2025-05-23T00:00:00', // Fixed start date for progress calculation
  notified: false,
  emoji: '✈️',
};

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Patterned Background */}
      <div className="absolute inset-0 opacity-[0.35]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%234a6fa5' stroke-width='1.5'%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3Cg transform='translate(40 12) rotate(15) scale(1.3)'%3E%3Crect x='-4' y='-4' width='8' height='8' rx='1'/%3E%3C/g%3E%3Cg transform='translate(72 10) rotate(30) scale(0.8)'%3E%3Cpolygon points='0 -5 -5 4 5 4'/%3E%3C/g%3E%3Cg transform='translate(100 14) rotate(-20) scale(1.1)'%3E%3Cpath d='M-4 0l4 4-4 4'/%3E%3C/g%3E%3Cg transform='translate(14 42) rotate(45) scale(0.7)'%3E%3Cpath d='M-4 -4l8 8'/%3E%3C/g%3E%3Cg transform='translate(100 45) scale(0.9)'%3E%3Cpath d='M0 -7c2-2 5-2 7 0s2 5 0 7l-7 7-7-7c-2-2-2-5 0-7s5-2 7 0z'/%3E%3C/g%3E%3Ccircle cx='42' cy='48' r='5'/%3E%3Cg transform='translate(70 44) rotate(70) scale(0.6)'%3E%3Cpath d='M-4 0l4 4-4 4'/%3E%3C/g%3E%3Cg transform='translate(12 75) rotate(-25) scale(0.85)'%3E%3Crect x='-4' y='-4' width='8' height='8' rx='1'/%3E%3C/g%3E%3Cg transform='translate(42 72) rotate(60) scale(1.2)'%3E%3Cpolygon points='0 -5 -5 4 5 4'/%3E%3C/g%3E%3Cg transform='translate(72 78) rotate(-30) scale(1.4)'%3E%3Cpath d='M-4 -4l8 8'/%3E%3C/g%3E%3Ccircle cx='102' cy='74' r='4'/%3E%3Cg transform='translate(16 105) scale(1.1)'%3E%3Cpath d='M0 -7c2-2 5-2 7 0s2 5 0 7l-7 7-7-7c-2-2-2-5 0-7s5-2 7 0z'/%3E%3C/g%3E%3Cg transform='translate(46 102) rotate(40) scale(0.75)'%3E%3Cpath d='M-4 0l4 4-4 4'/%3E%3C/g%3E%3Cg transform='translate(74 106) rotate(-45) scale(0.65)'%3E%3Crect x='-4' y='-4' width='8' height='8' rx='1'/%3E%3C/g%3E%3Cg transform='translate(104 104) rotate(20) scale(1.25)'%3E%3Cpolygon points='0 -5 -5 4 5 4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
      
      {/* Main Card */}
      <div className="relative w-full max-w-sm bg-card rounded-3xl shadow-xl shadow-primary/10 px-8 py-10">
                {/* Norwegian Flag */}
        <div className="flex justify-center mb-4">
          <span className="text-4xl">🇳🇴</span>
        </div>

        {/* Event Title - Top */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            {COUNTDOWN_EVENT.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {new Date(COUNTDOWN_EVENT.targetDate).toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
        
        {/* Countdown Display */}
        <CountdownDisplay
          countdown={COUNTDOWN_EVENT}
          onNotified={() => {}}
        />
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
