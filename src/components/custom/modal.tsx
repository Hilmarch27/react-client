"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useDialogStore from "@/hooks/store/use-dialog";
import RouterForm from "@/sections/dashboard/router/form";
import { FC } from "react";

export const DialogCustom: FC = () => {
  const { isOpen, closeDialog, dialogType } = useDialogStore();

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="w-auto h-auto max-w-[90vw] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="capitalize">{dialogType}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&#39;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-full min-w-[600px] max-w-3xl">
          {dialogType === "Create Router" && <RouterForm />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
