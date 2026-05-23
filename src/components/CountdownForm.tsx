import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface CountdownFormProps {
  onSubmit: (name: string, targetDate: string) => void;
  initialName?: string;
  initialDate?: Date;
}

export function CountdownForm({ onSubmit, initialName = '', initialDate }: CountdownFormProps) {
  const [name, setName] = useState(initialName);
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [hour, setHour] = useState<string | null>('12');
  const [minute, setMinute] = useState<string | null>('00');

  const handleSubmit = () => {
    if (name.trim() && date && hour && minute) {
      const targetDate = new Date(date);
      targetDate.setHours(parseInt(hour), parseInt(minute), 0, 0);
      onSubmit(name.trim(), targetDate.toISOString());
    }
  };

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

  const isValid = name.trim() && date;

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative p-8 rounded-3xl bg-gradient-to-b from-card/80 to-card/40 border border-border/50 backdrop-blur-sm shadow-2xl shadow-primary/5">
        {/* Decorative gradient orb */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative space-y-6">
          {/* Event Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground pl-1">
              What's the occasion?
            </label>
            <Input
              type="text"
              placeholder="New Year, Birthday, Vacation..."
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className="h-14 text-xl bg-background/50 border-border/50 rounded-2xl px-5 placeholder:text-muted-foreground/50 focus-visible:ring-primary/30"
            />
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Date Picker */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground pl-1">
                Date
              </label>
              <Popover>
                <PopoverTrigger
                  className={cn(
                    'flex w-full h-14 items-center gap-3 rounded-2xl border border-border/50 bg-background/50 px-4 text-base transition-all outline-none hover:bg-background/80 focus-visible:ring-2 focus-visible:ring-primary/30',
                    !date && 'text-muted-foreground/50'
                  )}
                >
                  <CalendarIcon className="h-5 w-5 text-primary/70" />
                  <span className="truncate">
                    {date ? format(date, 'MMM d, yyyy') : 'Pick date'}
                  </span>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Picker */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground pl-1">
                Time
              </label>
              <div className="flex h-14 items-center gap-1 rounded-2xl border border-border/50 bg-background/50 px-3">
                <Clock className="h-5 w-5 text-primary/70 shrink-0" />
                <Select value={hour} onValueChange={setHour}>
                  <SelectTrigger className="h-10 border-0 bg-transparent shadow-none px-2 text-base focus-visible:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((h) => (
                      <SelectItem key={h} value={h}>{h}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-xl text-muted-foreground/50">:</span>
                <Select value={minute} onValueChange={setMinute}>
                  <SelectTrigger className="h-10 border-0 bg-transparent shadow-none px-2 text-base focus-visible:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {minutes.map((m) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit} 
            disabled={!isValid}
            className={cn(
              "w-full h-14 text-lg font-semibold rounded-2xl transition-all duration-300",
              isValid 
                ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25" 
                : "bg-muted text-muted-foreground"
            )}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Countdown
          </Button>
        </div>
      </div>
    </div>
  );
}
