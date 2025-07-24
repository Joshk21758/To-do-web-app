'use client';

import { TaskItem } from './task-item';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

export function TaskList({ tasks, onToggleTask, onDeleteTask, onAddToCalendar, onClearCompleted, completedCount }) {
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed rounded-lg">
        <h3 className="text-lg font-medium text-muted-foreground">No tasks yet!</h3>
        <p className="text-sm text-muted-foreground">Add a task above or get suggestions from AI.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pendingTasks.length > 0 && (
        <ul className="space-y-2">
          {pendingTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
              onAddToCalendar={onAddToCalendar}
            />
          ))}
        </ul>
      )}

      {completedTasks.length > 0 && (
        <div>
          <div className="flex items-center justify-between my-4">
             <h3 className="text-sm font-medium text-muted-foreground">Completed ({completedCount})</h3>
             <Button variant="ghost" size="sm" onClick={onClearCompleted} className="text-muted-foreground hover:text-foreground">Clear completed</Button>
          </div>
          <ul className="space-y-2">
            {completedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
                onAddToCalendar={onAddToCalendar}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
