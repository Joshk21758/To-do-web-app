'use client';

import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TaskItem({ task, onToggle, onDelete, onAddToCalendar }) {
  return (
    <li
      className={cn(
        'flex items-center gap-3 p-3 rounded-lg transition-colors group',
        task.completed ? 'bg-muted/50' : 'bg-card hover:bg-muted/60'
      )}
    >
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        aria-label={`Mark task ${task.completed ? 'incomplete' : 'complete'}`}
      />
      <div className="flex-grow">
        <label
          htmlFor={`task-${task.id}`}
          className={cn(
            'font-medium transition-all',
            task.completed ? 'text-muted-foreground line-through' : 'text-foreground'
          )}
        >
          {task.text}
        </label>
        {task.dueDate && (
          <p className={cn("text-xs", task.completed ? 'text-muted-foreground/80' : 'text-muted-foreground')}>
            Due: {format(task.dueDate, 'PPP')}
          </p>
        )}
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {task.dueDate && !task.completed && (
          <Button variant="ghost" size="icon" onClick={() => onAddToCalendar(task)} aria-label="Add to calendar">
            <Calendar className="h-4 w-4" />
          </Button>
        )}
        <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)} className="text-destructive/80 hover:text-destructive hover:bg-destructive/10" aria-label="Delete task">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </li>
  );
}
