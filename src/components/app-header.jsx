import { Button } from "@/components/ui/button";
import { Download, Feather } from "lucide-react";
import Link from "next/link";

export function AppHeader({ onExport }) {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Feather className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-foreground">
            TaskFinder
          </h1>
        </div>
      </div>
    </header>
  );
}
