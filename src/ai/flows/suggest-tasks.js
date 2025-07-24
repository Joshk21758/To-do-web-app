'use server';

/**
 * @fileOverview AI-powered task suggestion flow.
 *
 * This file defines a Genkit flow that suggests tasks based on a user-provided prompt.
 * It exports:
 * - `suggestTasks`: The main function to trigger the task suggestion flow.
 * - `SuggestTasksInputSchema`: The Zod schema for the input.
 * - `SuggestTasksOutputSchema`: The Zod schema for the output.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const SuggestTasksInputSchema = z.object({
  prompt: z.string().describe('A prompt describing the type of tasks to suggest.'),
});

export const SuggestTasksOutputSchema = z.object({
  tasks: z
    .array(z.string())
    .describe('An array of suggested tasks based on the prompt.'),
});

export async function suggestTasks(input) {
  return suggestTasksFlow(input);
}

const suggestTasksPrompt = ai.definePrompt({
  name: 'suggestTasksPrompt',
  input: {schema: SuggestTasksInputSchema},
  output: {schema: SuggestTasksOutputSchema},
  prompt: `You are a helpful assistant designed to suggest tasks based on a user's prompt.

  The user will provide a prompt describing the type of tasks they need. Generate a list of tasks that a user can add to their to do list to accomplish their goal.

  Prompt: {{{prompt}}}
  `,
});

const suggestTasksFlow = ai.defineFlow(
  {
    name: 'suggestTasksFlow',
    inputSchema: SuggestTasksInputSchema,
    outputSchema: SuggestTasksOutputSchema,
  },
  async input => {
    const {output} = await suggestTasksPrompt(input);
    return output;
  }
);
