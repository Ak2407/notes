"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";

type SolutionDialogProps = {
  open: boolean;
  onClose: () => void;
  text: string;
};

const SolutionDialog = ({ open, onClose, text }: SolutionDialogProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onClose}>
        <DrawerContent>
          <DrawerTitle>Solution :</DrawerTitle>
          <h1>{text}</h1>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Solution :</DialogTitle>
        <h1>{text}</h1>
      </DialogContent>
    </Dialog>
  );
};

export default SolutionDialog;
