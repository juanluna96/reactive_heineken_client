import type { Variants } from 'framer-motion';

export const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const errorMessageVariants: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15, ease: 'easeIn' } },
};

export const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.12, ease: 'easeIn' } },
};

export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } },
};

export const modalPanelVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, y: 12, scale: 0.97, transition: { duration: 0.15, ease: 'easeIn' } },
};

// Directional tab-panel swap (e.g. AdminSettingsScreen's Restaurantes /
// Stars Server tabs) — slides toward the side the newly active tab sits on,
// keyed by a `custom` direction (1 = forward/right, -1 = backward/left).
export const tabPanelVariants: Variants = {
  hidden: (direction: number) => ({ opacity: 0, x: direction >= 0 ? 24 : -24 }),
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -24 : 24,
    transition: { duration: 0.2, ease: 'easeIn' },
  }),
};

export const toastVariants: Variants = {
  hidden: { opacity: 0, y: -24, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -16, scale: 0.95, transition: { duration: 0.2, ease: 'easeIn' } },
};
