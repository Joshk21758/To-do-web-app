import { Button } from '@/components/ui/button';
import { Download, Feather } from 'lucide-react';

type AppHeaderProps = {
  onExport: () => void;
};

export function AppHeader({ onExport }: AppHeaderProps) {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Feather className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-foreground">
            TaskFlow
          </h1>
        </div>
        <Button variant="outline" onClick={onExport}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </header>
  );
}
