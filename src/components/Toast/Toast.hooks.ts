import { useEffect } from 'react';
import type { ToastProps } from './Toast.types';

const DEFAULT_DURATION_MS = 5000;

export const useToast = ({ onDismiss, duration = DEFAULT_DURATION_MS }: ToastProps) => {
  useEffect(() => {
    const timeoutId = setTimeout(onDismiss, duration);
    return () => clearTimeout(timeoutId);
    // Intentionally excludes `onDismiss` — callers typically pass a fresh
    // inline function each render, and re-arming the timer on every parent
    // re-render (e.g. every keystroke elsewhere on the same screen) would
    // mean the toast never actually auto-dismisses after `duration`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);
};
