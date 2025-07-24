'use client';

import * as React from 'react';
import { getAiSuggestions } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';

type AiSuggesterProps = {
  onAddSuggestedTasks: (tasks: string[]) => void;
};

export function AiSuggester({ onAddSuggestedTasks }: AiSuggesterProps) {
  const [prompt, setPrompt] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleSuggest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsLoading(true);
    setSuggestions([]);
    
    const result = await getAiSuggestions(prompt);
    
    if (result.success && result.tasks) {
      setSuggestions(result.tasks);
    } else {
      toast({
        variant: 'destructive',
        title: 'AI Suggestion Failed',
        description: result.error || 'Could not retrieve suggestions. Please try again.',
      });
    }
    setIsLoading(false);
  };

  const handleAddSuggestion = (taskText: string) => {
    onAddSuggestedTasks([taskText]);
    setSuggestions(current => current.filter(s => s !== taskText));
    toast({
      title: 'Task Added!',
      description: `"${taskText}" has been added to your list.`,
    });
  };

  return (
    <Card className="shadow-lg sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Sparkles className="text-accent h-6 w-6" />
          AI Task Suggester
        </CardTitle>
        <CardDescription>
          Feeling stuck? Describe a goal, and let AI break it down into actionable tasks for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSuggest} className="space-y-4">
          <Textarea
            placeholder="e.g., 'Plan a weekend trip to the mountains' or 'Organize my home office'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
            rows={4}
          />
          <Button type="submit" disabled={isLoading || !prompt.trim()} className="w-full">
            {isLoading ? 'Thinking...' : 'Suggest Tasks'}
          </Button>
        </form>

        {(isLoading || suggestions.length > 0) && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-foreground">Suggestions</h4>
            <div className="space-y-2">
              {isLoading ? (
                <>
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-5/6" />
                  <Skeleton className="h-8 w-3/4" />
                </>
              ) : (
                suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50 group">
                    <span className="text-sm text-foreground">{suggestion}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleAddSuggestion(suggestion)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlusCircle className="h-5 w-5 text-accent" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
