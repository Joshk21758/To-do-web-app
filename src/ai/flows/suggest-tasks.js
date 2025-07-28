'use server';

/**
 * @fileOverview AI-powered task suggestion flow.
 *
 * This file defines a Genkit flow that suggests tasks based on a user-provided prompt.
 * It exports:
 * - `suggestTasks`: The main function to trigger the task suggestion flow.
 */

import {ai} from '@/ai/genkit';

export async function suggestTasks(input, schemas) {
  const { SuggestTasksInputSchema, SuggestTasksOutputSchema } = schemas;

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
    async (flowInput) => {
      const {output} = await suggestTasksPrompt(flowInput);
      return output;
    }
  );

  return suggestTasksFlow(input);
}
