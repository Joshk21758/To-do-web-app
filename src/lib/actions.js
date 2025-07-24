'use server';

import { suggestTasks } from '@/ai/flows/suggest-tasks';

export async function getAiSuggestions(prompt) {
  try {
    const input = { prompt };
    const result = await suggestTasks(input);
    return { success: true, tasks: result.tasks };
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    return { success: false, error: 'Failed to get suggestions from AI.' };
  }
}
