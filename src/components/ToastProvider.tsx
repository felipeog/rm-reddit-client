import { SnackbarProvider } from "notistack";
import { Toast } from "./Toast";

export function ToastProvider() {
  return <SnackbarProvider Components={{ default: Toast }}></SnackbarProvider>;
}
