import { useAlertDialogStore } from "./alert-dialog-store";
import { AlertDialogRenderedDialog } from "./AlertDialogRenderedDialog";

export const AlertDialogRenderer = () => {
  const dialog = useAlertDialogStore((state) => state.dialogs[0]);

  if (dialog) {
    return <AlertDialogRenderedDialog {...dialog} />;
  }

  return null;
};
