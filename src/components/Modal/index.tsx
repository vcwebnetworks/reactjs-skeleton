import React, {
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';

import * as S from './styles';

export interface ModalProps {
  open: boolean;
  maxWidth?: string;
  children: ReactNode;
  centered?: boolean;
  onClose?: () => void;
  className?: string;
}

const Modal = ({
  open,
  onClose = () => {},
  centered = true,
  maxWidth,
  children,
  ...props
}: ModalProps) => {
  const wrapperRef = useRef(null);

  const handleOverlayClose = useCallback(
    async (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === wrapperRef.current) {
        await onClose();
      }
    },
    [onClose],
  );

  const handleEscKey = useCallback(
    async event => {
      if (event.keyCode === 27) {
        await onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.body.style.overflowY = open ? 'hidden' : 'auto';

    if (open) {
      window.addEventListener('keyup', handleEscKey);
    } else {
      window.removeEventListener('keyup', handleEscKey);
    }

    return () => {
      window.removeEventListener('keyup', handleEscKey);
    };
  }, [handleEscKey, open]);

  return createPortal(
    <S.Wrapper
      $open={open}
      $centered={centered}
      ref={wrapperRef}
      onClick={handleOverlayClose}
    >
      <S.Content {...props} style={{ width: maxWidth }}>
        {children}
      </S.Content>
    </S.Wrapper>,
    document.body,
  );
};

export default React.memo(Modal);
