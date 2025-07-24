'use client';

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plus, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

const addTaskSchema = z.object({
  text: z.string().min(1, { message: 'Task cannot be empty.' }).max(150, {message: 'Task is too long.'}),
  dueDate: z.date().nullable(),
});

type AddTaskFormValues = z.infer<typeof addTaskSchema>;

type AddTaskFormProps = {
  onAddTask: (text: string, dueDate: Date | null) => void;
};

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const form = useForm<AddTaskFormValues>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      text: '',
      dueDate: null,
    },
  });

  const onSubmit = (data: AddTaskFormValues) => {
    onAddTask(data.text, data.dueDate);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input placeholder="e.g., Plan team meeting for Friday" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[180px] justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={field.value ?? undefined}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        {form.watch('dueDate') && (
           <Button
             type="button"
             variant="ghost"
             size="icon"
             className="shrink-0"
             onClick={() => form.setValue('dueDate', null)}
           >
             <X className="h-4 w-4 text-muted-foreground" />
             <span className="sr-only">Clear date</span>
           </Button>
        )}
        <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </form>
    </Form>
  );
}
