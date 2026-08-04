import { useTranslation } from '../../i18n';
import type { WelcomeScreenProps } from './WelcomeScreen.types';

export const useWelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const { t } = useTranslation();

  const handleStart = () => {
    onStart?.();
  };

  return { t, handleStart };
};
