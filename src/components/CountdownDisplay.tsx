import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { useTimeRemaining } from '@/hooks/useTimeRemaining';
import { toast } from 'sonner';
import type { Countdown } from '@/types/countdown';

interface CountdownDisplayProps {
  countdown: Countdown & { emoji?: string };
  onNotified: () => void;
}

interface ProgressRingProps {
  seconds: number; // 0 to 59
  size?: number;
  strokeWidth?: number;
  children: React.ReactNode;
}

function ProgressRing({ seconds, size = 320, strokeWidth = 12, children }: ProgressRingProps) {
  const dotSize = 24;
  const padding = dotSize / 2 + 2; // Extra padding for the dot
  const svgSize = size + padding * 2;
  const radius = (size - strokeWidth) / 2;
  const center = svgSize / 2;
  
  // Track continuous rotation to avoid snapping back
  const [totalRotation, setTotalRotation] = useState(() => -(seconds / 60) * 360);
  const prevSecondsRef = useRef(seconds);
  
  useEffect(() => {
    const prevSeconds = prevSecondsRef.current;
    let delta = prevSeconds - seconds; // How much we moved (positive = forward in time)
    
    // Handle wrap-around from 59 to 0 (normal countdown tick)
    if (delta < -30) {
      // Went from low number to high (e.g., 0 to 59) - unlikely in countdown
      delta = delta + 60;
    } else if (delta > 30) {
      // Went from high to low (e.g., 59 to 0) - normal countdown tick
      delta = delta - 60;
    }
    
    setTotalRotation(prev => prev + (delta / 60) * 360);
    prevSecondsRef.current = seconds;
  }, [seconds]);

  // Pick emoji based on position (quadrant)
  // 12 o'clock (0-14s) = 😁, 9 o'clock (15-29s) = 😄, 6 o'clock (30-44s) = 😊, 3 o'clock (45-59s) = 🙂
  const getEmoji = () => {
    if (seconds < 15) return '😁';
    if (seconds < 30) return '😄';
    if (seconds < 45) return '😊';
    return '🙂';
  };

  return (
    <div className="relative" style={{ width: svgSize, height: svgSize }}>
      <svg
        className="absolute top-0 left-0"
        width={svgSize}
        height={svgSize}
      >
        {/* Background circle track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-border/50"
        />
      </svg>
      {/* Rotating emoji container */}
      <div 
        className="absolute inset-0 transition-transform duration-1000 ease-linear"
        style={{ transform: `rotate(${totalRotation}deg)` }}
      >
        <div 
          className="absolute left-1/2 -translate-x-1/2 text-2xl transition-transform duration-1000 ease-linear"
          style={{ top: padding - dotSize / 2, transform: `translateX(-50%) rotate(${-totalRotation}deg)` }}
        >
          {getEmoji()}
        </div>
      </div>
      {/* Content inside the ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

function fireConfetti() {
  const duration = 5000;
  const end = Date.now() + duration;

  const colors = ['#93c5fd', '#60a5fa', '#3b82f6', '#a5b4fc', '#818cf8'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  // Big burst in the center
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors,
    });
  }, 500);
}

export function CountdownDisplay({ countdown, onNotified }: CountdownDisplayProps) {
  const timeRemaining = useTimeRemaining(countdown.targetDate);
  const isExpired = timeRemaining.total <= 0;
  const isLessThanOneDay = timeRemaining.days === 0 && !isExpired;
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (isExpired && !hasTriggered.current) {
      hasTriggered.current = true;
      
      // Fire confetti
      fireConfetti();
      
      // Play sound
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Onp2ZjXdwaW14hZKcnJaNfnFqb3qHlZ2blYx+cWxwfImWnZqTi31wbXF/i5edmpGJfHBtc4KOmJuXj4R5b29/ipabmZKHe3BvgImVmpeSg3lwb4GJlZqXkYJ4b3CDi5aamJCBeG9xhI2YmpaPgHZucYSOmJqWjX91bnKFjpiZlIt9dG5zhY+YmZOKfHNuc4aPmJmSiXtzbnSHkJiYkYh6cm51h5GYl5CHem9zd4mSmJaPhnhvc3mKkpiVjYV3b3R6i5OYlIyDdm90e4yUl5SLgnVudXyNlJeUioFzbXd9jZWXk4l/cm14fo6Vl5KHfnFueX+Pl5aShn1wbnqAkJeWkYR8b299gZGWlZCDe25wfYKSl5WPgXltcX6Dk5eUjoBzbXJ/hJSWk41/cm1zgYWVlpKMfnFtdIKGlZWRi31wbXWDh5aVkIl7b253hIiWlI+IeW5veYWJlpOOhndtcHqGipaSjYV2bXF7h4uWko2Ddm1yfIiMlpGLgXRtc32IjZaQioB0bXR+iY6Wj4l/c210f4qPlY6IfnJtdYCLkJWNh31xbnaAjJGVjIZ8cW53gY2SlYuFe3Bud4KNkpSKhHpwb3mDjpOTiYJ5cG96hI+TkoeBeG9we4WQk5KGgHhvb3yGkJORhX92b3B9h5GSj4R+dm9xfYeRko6DfXVvcn6IkpKOgnx0b3N/iZKRjIF7dG90gIqSkYuAenRvdYGLko+JfnlzcHaCjJKOiH15cm93g42Sjod8eHJveISNkY2GenhycHmFjpGMhXl3cnF5hY+Qi4R5d3Fye4aQkIqDeHdwc3uHkI+JgndxcnyIkY+Igndzc32JkY6HgXdyc36KkY2GgHdxdH+Lko2FfnZxdX+MkoyEfXVwdn+NkouDfHVxd4CNkomCe3RxeYGOkomBendweYKPkYiAeXZweYOPkYd/eXVweYSQkIZ+eHVxeoSRkIV9d3VxeoWSj4R8dnVye4aSjYN7dnRzfIeSjIJ6dXR0fYiSjIB5dXR1foiRi395dHR2f4mRin54dHR2gImQiX13c3V3gYqPiHx3c3Z4gYuOh3t2c3Z5gouOhnt1c3d6g4yNhXp0c3d6hI2MhHl0c3h7hY2LgnlzcnmE');
      audio.play().catch(() => {});
      
      // Toast notification
      toast.success(`${countdown.name} has arrived!`, {
        description: 'The wait is over!',
        duration: 5000,
      });
      
      // Browser notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`${countdown.name} has arrived!`, {
          body: 'The wait is over!',
        });
      }
      
      onNotified();
    }
  }, [isExpired, countdown.name, onNotified]);

  if (isExpired) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <ProgressRing seconds={0}>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent animate-pulse">
              It's Time!
            </div>
          </div>
        </ProgressRing>
        <p className="text-lg text-muted-foreground mt-4">{countdown.name} has arrived</p>
      </div>
    );
  }

  if (isLessThanOneDay) {
    return (
      <div className="flex flex-col items-center">
        <ProgressRing seconds={timeRemaining.seconds}>
          <div className="flex flex-col items-center">
            {/* Emoji Icon */}
            {countdown.emoji && (
              <span className="text-4xl mb-2">{countdown.emoji}</span>
            )}
            
            {/* Hours display */}
            <div className="text-center">
              <span className="text-6xl font-bold text-foreground tabular-nums">
                {String(timeRemaining.hours).padStart(2, '0')}
              </span>
              <span className="text-xl font-medium text-muted-foreground ml-1">
                hr
              </span>
            </div>
            
            {/* Minutes and seconds */}
            <div className="flex items-center gap-3 text-muted-foreground mt-2">
              <div className="text-center">
                <span className="text-2xl font-semibold tabular-nums">
                  {String(timeRemaining.minutes).padStart(2, '0')}
                </span>
                <span className="text-xs ml-1">min</span>
              </div>
              <span className="text-muted-foreground/40">:</span>
              <div className="text-center">
                <span className="text-2xl font-semibold tabular-nums opacity-60">
                  {String(timeRemaining.seconds).padStart(2, '0')}
                </span>
                <span className="text-xs ml-1">sec</span>
              </div>
            </div>
          </div>
        </ProgressRing>
      </div>
    );
  }

  // Days as main focus - inspired by "days til" design
  return (
    <div className="flex flex-col items-center">
      <ProgressRing seconds={timeRemaining.seconds}>
        <div className="flex flex-col items-center">
          {/* Emoji Icon */}
          {countdown.emoji && (
            <span className="text-4xl mb-2">{countdown.emoji}</span>
          )}
          
          {/* Days - Large and prominent */}
          <div className="text-center">
            <span className="text-8xl font-bold text-foreground tabular-nums leading-none">
              {timeRemaining.days}
            </span>
          </div>
          <p className="text-xl font-medium text-muted-foreground">
            {timeRemaining.days === 1 ? 'day' : 'days'}
          </p>
          
          {/* Hours, Minutes - Compact row */}
          <div className="flex items-center justify-center gap-3 text-muted-foreground mt-2">
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg font-semibold tabular-nums">
                {String(timeRemaining.hours).padStart(2, '0')}
              </span>
              <span className="text-xs">hr</span>
            </div>
            <span className="text-muted-foreground/40">:</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg font-semibold tabular-nums">
                {String(timeRemaining.minutes).padStart(2, '0')}
              </span>
              <span className="text-xs">min</span>
            </div>
            <span className="text-muted-foreground/40">:</span>
            <div className="flex items-baseline gap-0.5 opacity-60">
              <span className="text-lg font-semibold tabular-nums">
                {String(timeRemaining.seconds).padStart(2, '0')}
              </span>
              <span className="text-xs">sec</span>
            </div>
          </div>
        </div>
      </ProgressRing>
    </div>
  );
}
