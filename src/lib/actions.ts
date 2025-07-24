'use server';

import { suggestTasks, SuggestTasksInput } from '@/ai/flows/suggest-tasks';

export async function getAiSuggestions(prompt: string) {
  try {
    const input: SuggestTasksInput = { prompt };
    const result = await suggestTasks(input);
    return { success: true, tasks: result.tasks };
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    return { success: false, error: 'Failed to get suggestions from AI.' };
  }
}
