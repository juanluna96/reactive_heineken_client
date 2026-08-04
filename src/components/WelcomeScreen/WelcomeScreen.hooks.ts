import { useTranslation, type Language } from '../../i18n';
import type { WelcomeScreenProps } from './WelcomeScreen.types';

export const useWelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const { t, language, setLanguage } = useTranslation();

  const handleSelectLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
  };

  const handleStart = () => {
    onStart?.();
  };

  return { t, language, handleSelectLanguage, handleStart };
};
