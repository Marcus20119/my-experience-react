export interface ToastMessageProps {
  description?: string;
  message?: string;
  zIndex?: number;
}

export interface ToastMessageRef {
  showError: (props: ToastMessageProps) => void;
  showInfo: (props: ToastMessageProps) => void;
  showSuccess: (props: ToastMessageProps) => void;
  showWarning: (props: ToastMessageProps) => void;
}
