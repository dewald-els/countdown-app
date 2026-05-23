import { useEffect } from 'react';
import { useTimeRemaining } from '@/hooks/useTimeRemaining';
import { toast } from 'sonner';
import type { Countdown } from '@/types/countdown';

interface CountdownDisplayProps {
  countdown: Countdown;
  onNotified: () => void;
}

export function CountdownDisplay({ countdown, onNotified }: CountdownDisplayProps) {
  const timeRemaining = useTimeRemaining(countdown.targetDate);
  const isExpired = timeRemaining.total <= 0;
  const isLessThanOneDay = timeRemaining.days === 0 && !isExpired;

  useEffect(() => {
    if (isExpired && !countdown.notified) {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Onp2ZjXdwaW14hZKcnJaNfnFqb3qHlZ2blYx+cWxwfImWnZqTi31wbXF/i5edmpGJfHBtc4KOmJuXj4R5b29/ipabmZKHe3BvgImVmpeSg3lwb4GJlZqXkYJ4b3CDi5aamJCBeG9xhI2YmpaPgHZucYSOmJqWjX91bnKFjpiZlIt9dG5zhY+YmZOKfHNuc4aPmJmSiXtzbnSHkJiYkYh6cm51h5GYl5CHem9zd4mSmJaPhnhvc3mKkpiVjYV3b3R6i5OYlIyDdm90e4yUl5SLgnVudXyNlJeUioFzbXd9jZWXk4l/cm14fo6Vl5KHfnFueX+Pl5aShn1wbnqAkJeWkYR8b299gZGWlZCDe25wfYKSl5WPgXltcX6Dk5eUjoBzbXJ/hJSWk41/cm1zgYWVlpKMfnFtdIKGlZWRi31wbXWDh5aVkIl7b253hIiWlI+IeW5veYWJlpOOhndtcHqGipaSjYV2bXF7h4uWko2Ddm1yfIiMlpGLgXRtc32IjZaQioB0bXR+iY6Wj4l/c210f4qPlY6IfnJtdYCLkJWNh31xbnaAjJGVjIZ8cW53gY2SlYuFe3Bud4KNkpSKhHpwb3mDjpOTiYJ5cG96hI+TkoeBeG9we4WQk5KGgHhvb3yGkJORhX92b3B9h5GSj4R+dm9xfYeRko6DfXVvcn6IkpKOgnx0b3N/iZKRjIF7dG90gIqSkYuAenRvdYGLko+JfnlzcHaCjJKOiH15cm93g42Sjod8eHJveISNkY2GenhycHmFjpGMhXl3cnF5hY+Qi4R5d3Fye4aQkIqDeHdwc3uHkI+JgndxcnyIkY+Igndzc32JkY6HgXdyc36KkY2GgHdxdH+Lko2FfnZxdX+MkoyEfXVwdn+NkouDfHVxd4CNkomCe3RxeYGOkomBendweYKPkYiAeXZweYOPkYd/eXVweYSQkIZ+eHVxeoSRkIV9d3VxeoWSj4R8dnVye4aSjYN7dnRzfIeSjIJ6dXR0fYiSjIB5dXR1foiRi395dHR2f4mRin54dHR2gImQiX13c3V3gYqPiHx3c3Z4gYuOh3t2c3Z5gouOhnt1c3d6g4yNhXp0c3d6hI2MhHl0c3h7hY2LgnlzcnmE');
      audio.play().catch(() => {});
      
      toast.success(`${countdown.name} has arrived!`, {
        description: 'Your countdown has finished.',
        duration: 5000,
      });
      
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`${countdown.name} has arrived!`, {
          body: 'Your countdown has finished.',
        });
      }
      
      onNotified();
    }
  }, [isExpired, countdown.notified, countdown.name, onNotified]);

  if (isExpired) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-6xl md:text-8xl font-bold text-green-500 mb-4">
          It's Time!
        </div>
        <p className="text-xl text-muted-foreground">{countdown.name} has arrived</p>
      </div>
    );
  }

  if (isLessThanOneDay) {
    // Hours as the main focus
    return (
      <div className="flex flex-col items-center justify-center py-8 md:py-16">
        {/* Hours - Main */}
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-[8rem] md:text-[12rem] font-bold leading-none tracking-tight bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent tabular-nums">
            {String(timeRemaining.hours).padStart(2, '0')}
          </span>
          <span className="text-2xl md:text-4xl font-medium text-muted-foreground uppercase tracking-widest">
            hrs
          </span>
        </div>
        
        {/* Minutes and Seconds */}
        <div className="flex items-center gap-8 md:gap-12">
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl font-semibold tabular-nums text-foreground/80">
              {String(timeRemaining.minutes).padStart(2, '0')}
            </span>
            <span className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-widest mt-1">
              min
            </span>
          </div>
          <div className="w-px h-16 bg-border" />
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl font-semibold tabular-nums text-foreground/60">
              {String(timeRemaining.seconds).padStart(2, '0')}
            </span>
            <span className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-widest mt-1">
              sec
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Days as the main focus
  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-16">
      {/* Days - Main */}
      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-[8rem] md:text-[12rem] font-bold leading-none tracking-tight bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent tabular-nums">
          {timeRemaining.days}
        </span>
        <span className="text-2xl md:text-4xl font-medium text-muted-foreground uppercase tracking-widest">
          {timeRemaining.days === 1 ? 'day' : 'days'}
        </span>
      </div>
      
      {/* Hours and Minutes */}
      <div className="flex items-center gap-8 md:gap-12">
        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-7xl font-semibold tabular-nums text-foreground/80">
            {String(timeRemaining.hours).padStart(2, '0')}
          </span>
          <span className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-widest mt-1">
            hrs
          </span>
        </div>
        <div className="w-px h-16 bg-border" />
        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-7xl font-semibold tabular-nums text-foreground/60">
            {String(timeRemaining.minutes).padStart(2, '0')}
          </span>
          <span className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-widest mt-1">
            min
          </span>
        </div>
      </div>

      {/* Seconds - subtle */}
      <div className="mt-6 text-2xl md:text-3xl font-medium tabular-nums text-muted-foreground/60">
        {String(timeRemaining.seconds).padStart(2, '0')}
        <span className="text-sm ml-1 uppercase tracking-widest">sec</span>
      </div>
    </div>
  );
}
