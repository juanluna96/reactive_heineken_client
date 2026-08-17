export interface ToastProps {
  message: string;
  onDismiss: () => void;
  /** Milliseconds before onDismiss fires automatically. Default 5000. */
  duration?: number;
}
