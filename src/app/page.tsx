'use client';

import * as React from 'react';
import { AppHeader } from '@/components/app-header';
import { AddTaskForm } from '@/components/add-task-form';
import { TaskList } from '@/components/task-list';
import { AiSuggester } from '@/components/ai-suggester';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Task } from '@/types';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { generateIcsContent } from '@/lib/calendar';
import { downloadFile } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';

// uuid is not a dependency, let's use a simpler id generator
const simpleId = () => `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;


export default function Home() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

  const handleAddTask = (text: string, dueDate: Date | null) => {
    const newTask: Task = { id: simpleId(), text, completed: false, dueDate };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleAddSuggestedTasks = (suggestedTasks: string[]) => {
    const newTasks: Task[] = suggestedTasks.map(text => ({
      id: simpleId(),
      text,
      completed: false,
      dueDate: null,
    }));
    setTasks(prevTasks => [...prevTasks, ...newTasks]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  }

  const handleExport = () => {
    const header = "TaskFlow - To-Do List\n";
    const date = `Exported on: ${new Date().toLocaleDateString()}\n\n`;
    const pending = "Pending Tasks:\n" + tasks.filter(t => !t.completed).map(t => `- [ ] ${t.text}${t.dueDate ? ` (Due: ${new Date(t.dueDate).toLocaleDateString()})` : ''}`).join("\n");
    const completed = "\n\nCompleted Tasks:\n" + tasks.filter(t => t.completed).map(t => `- [x] ${t.text}`).join("\n");
    
    const content = header + date + pending + completed;
    downloadFile(content, 'taskflow-export.txt', 'text/plain');
  };

  const handleAddToCalendar = (task: Task) => {
    if (!task.dueDate) return;
    const icsContent = generateIcsContent(task);
    const fileName = `${task.text.replace(/ /g, '_')}.ics`;
    downloadFile(icsContent, fileName, 'text/calendar');
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader onExport={handleExport} />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-headline">My Tasks</CardTitle>
                <CardDescription>What do you need to get done today?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <AddTaskForm onAddTask={handleAddTask} />
                <TaskList
                  tasks={tasks}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                  onAddToCalendar={handleAddToCalendar}
                  onClearCompleted={handleClearCompleted}
                  completedCount={completedCount}
                />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <AiSuggester onAddSuggestedTasks={handleAddSuggestedTasks} />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground">
        <p>Built with ❤️ for seamless productivity. TaskFlow.</p>
      </footer>
    </div>
  );
}
