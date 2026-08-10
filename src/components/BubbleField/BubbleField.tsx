import * as S from './BubbleField.styles';
import { useBubbleField } from './BubbleField.hooks';

export const BubbleField = () => {
  const { canvasRef } = useBubbleField();

  return <S.Canvas ref={canvasRef} />;
};
