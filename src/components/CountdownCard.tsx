import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTimeRemaining } from '@/hooks/useTimeRemaining';
import { toast } from 'sonner';
import type { Countdown } from '@/types/countdown';

interface CountdownCardProps {
  countdown: Countdown;
  onDelete: (id: string) => void;
  onNotified: (id: string) => void;
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center bg-background rounded-lg p-3 min-w-[60px]">
      <span className="text-2xl font-bold tabular-nums text-primary">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs uppercase text-muted-foreground tracking-wide">
        {label}
      </span>
    </div>
  );
}

export function CountdownCard({ countdown, onDelete, onNotified }: CountdownCardProps) {
  const timeRemaining = useTimeRemaining(countdown.targetDate);
  const isExpired = timeRemaining.total <= 0;

  useEffect(() => {
    if (isExpired && !countdown.notified) {
      // Play notification sound
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Onp2ZjXdwaW14hZKcnJaNfnFqb3qHlZ2blYx+cWxwfImWnZqTi31wbXF/i5edmpGJfHBtc4KOmJuXj4R5b29/ipabmZKHe3BvgImVmpeSg3lwb4GJlZqXkYJ4b3CDi5aamJCBeG9xhI2YmpaPgHZucYSOmJqWjX91bnKFjpiZlIt9dG5zhY+YmZOKfHNuc4aPmJmSiXtzbnSHkJiYkYh6cm51h5GYl5CHem9zd4mSmJaPhnhvc3mKkpiVjYV3b3R6i5OYlIyDdm90e4yUl5SLgnVudXyNlJeUioFzbXd9jZWXk4l/cm14fo6Vl5KHfnFueX+Pl5aShn1wbnqAkJeWkYR8b299gZGWlZCDe25wfYKSl5WPgXltcX6Dk5eUjoBzbXJ/hJSWk41/cm1zgYWVlpKMfnFtdIKGlZWRi31wbXWDh5aVkIl7b253hIiWlI+IeW5veYWJlpOOhndtcHqGipaSjYV2bXF7h4uWko2Ddm1yfIiMlpGLgXRtc32IjZaQioB0bXR+iY6Wj4l/c210f4qPlY6IfnJtdYCLkJWNh31xbnaAjJGVjIZ8cW53gY2SlYuFe3Bud4KNkpSKhHpwb3mDjpOTiYJ5cG96hI+TkoeBeG9we4WQk5KGgHhvb3yGkJORhX92b3B9h5GSj4R+dm9xfYeRko6DfXVvcn6IkpKOgnx0b3N/iZKRjIF7dG90gIqSkYuAenRvdYGLko+JfnlzcHaCjJKOiH15cm93g42Sjod8eHJveISNkY2GenhycHmFjpGMhXl3cnF5hY+Qi4R5d3Fye4aQkIqDeHdwc3uHkI+JgndxcnyIkY+Igndzc32JkY6HgXdyc36KkY2GgHdxdH+Lko2FfnZxdX+MkoyEfXVwdn+NkouDfHVxd4CNkomCe3RxeYGOkomBendweYKPkYiAeXZweYOPkYd/eXVweYSQkIZ+eHVxeoSRkIV9d3VxeoWSj4R8dnVye4aSjYN7dnRzfIeSjIJ6dXR0fYiSjIB5dXR1foiRi395dHR2f4mRin54dHR2gImQiX13c3V3gYqPiHx3c3Z4gYuOh3t2c3Z5gouOhnt1c3d6g4yNhXp0c3d6hI2MhHl0c3h7hY2LgnlzcnmE');
      audio.play().catch(() => {});
      
      // Show toast notification
      toast.success(`${countdown.name} has arrived!`, {
        description: 'Your countdown has finished.',
        duration: 5000,
      });
      
      // Request browser notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`${countdown.name} has arrived!`, {
          body: 'Your countdown has finished.',
          icon: '/countdown-app/favicon.ico',
        });
      }
      
      onNotified(countdown.id);
    }
  }, [isExpired, countdown.notified, countdown.name, countdown.id, onNotified]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className={`transition-all hover:shadow-lg ${isExpired ? 'border-green-500 bg-green-500/5' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{countdown.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {formatDate(countdown.targetDate)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(countdown.id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isExpired ? (
          <div className="text-center py-4">
            <span className="text-xl font-semibold text-green-500">
              Event has arrived!
            </span>
          </div>
        ) : (
          <div className="flex gap-2 justify-center">
            <TimeBlock value={timeRemaining.days} label="Days" />
            <TimeBlock value={timeRemaining.hours} label="Hours" />
            <TimeBlock value={timeRemaining.minutes} label="Mins" />
            <TimeBlock value={timeRemaining.seconds} label="Secs" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
