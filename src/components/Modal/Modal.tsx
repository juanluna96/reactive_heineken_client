import { modalBackdropVariants, modalPanelVariants } from '../../animations/variants';
import * as S from './Modal.styles';
import { useModal } from './Modal.hooks';
import type { ModalProps } from './Modal.types';

export const Modal = (props: ModalProps) => {
  const { title, onClose, children } = props;
  const { handleBackdropClick } = useModal(props);

  return (
    <S.Backdrop
      onMouseDown={handleBackdropClick}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={modalBackdropVariants}
    >
      <S.Panel role="dialog" aria-modal="true" aria-label={title} variants={modalPanelVariants}>
        <S.Header>
          <S.Title>{title}</S.Title>
          <S.CloseButton type="button" onClick={onClose} aria-label="Close">
            <S.CloseIcon />
          </S.CloseButton>
        </S.Header>
        {children}
      </S.Panel>
    </S.Backdrop>
  );
};
