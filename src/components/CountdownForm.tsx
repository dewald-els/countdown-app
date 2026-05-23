import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface CountdownFormProps {
  onAdd: (name: string, targetDate: string) => void;
}

export function CountdownForm({ onAdd }: CountdownFormProps) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim() && date) {
      onAdd(name.trim(), date);
      setName('');
      setDate('');
    }
  };

  // Get minimum datetime (now)
  const minDateTime = new Date().toISOString().slice(0, 16);

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="event-name">Event Name</Label>
            <Input
              id="event-name"
              type="text"
              placeholder="e.g., Birthday, Vacation..."
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="event-date">Date & Time</Label>
            <Input
              id="event-date"
              type="datetime-local"
              value={date}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
              min={minDateTime}
              required
            />
          </div>
          <div className="flex items-end">
            <Button type="submit" className="w-full sm:w-auto">
              Add Countdown
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
