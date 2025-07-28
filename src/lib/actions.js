'use server';

import { suggestTasks } from '@/ai/flows/suggest-tasks';
import { z } from 'zod';

const SuggestTasksInputSchema = z.object({
  prompt: z.string().describe('A prompt describing the type of tasks to suggest.'),
});

const SuggestTasksOutputSchema = z.object({
  tasks: z
    .array(z.string())
    .describe('An array of suggested tasks based on the prompt.'),
});


export async function getAiSuggestions(prompt) {
  try {
    const input = { prompt };
    // We don't export the schemas from the flow file anymore, so we pass them in.
    const result = await suggestTasks(input, {
      SuggestTasksInputSchema,
      SuggestTasksOutputSchema,
    });
    return { success: true, tasks: result.tasks };
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    return { success: false, error: 'Failed to get suggestions from AI.' };
  }
}
