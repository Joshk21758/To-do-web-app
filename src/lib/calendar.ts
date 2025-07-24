import type { Task } from '@/types';

function formatDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

export function generateIcsContent(task: Task): string {
  if (!task.dueDate) {
    throw new Error('Task must have a due date to generate an ICS file.');
  }

  const startDate = formatDate(task.dueDate);
  // End date is one hour after start date for this example
  const endDate = formatDate(new Date(task.dueDate.getTime() + 60 * 60 * 1000));
  const createdDate = formatDate(new Date());

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TaskFlow//NONSGML v1.0//EN',
    'BEGIN:VEVENT',
    `UID:${task.id}@taskflow.app`,
    `DTSTAMP:${createdDate}`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:${task.text}`,
    'DESCRIPTION:A reminder for your task from TaskFlow.',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
}
