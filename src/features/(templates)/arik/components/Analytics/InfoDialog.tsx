"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";

interface InfoDialogProps {
  title: string;
  description: string;
}

export function InfoDialog({ title, description }: InfoDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="h-6 w-6 rounded-full p-0 text-wheat/60 hover:text-wheat hover:bg-transparent">
          <HelpCircle size={16} />
          <span className="sr-only">Info</span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-black border-wheat/15 text-wheat">
        <DialogHeader>
          <DialogTitle className="text-wheat">{title}</DialogTitle>
          <DialogDescription className="text-wheat/80">
            {description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
