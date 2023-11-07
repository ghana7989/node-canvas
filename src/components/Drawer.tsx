import '../drawer.css';

import clsx from 'clsx';
import FocusTrap from 'focus-trap-react';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import useMountTransition from '../hooks/useMountTransition';

function createPortalRoot(portalId: string) {
  const drawerRoot = document.createElement('div');
  drawerRoot.setAttribute('id', portalId);

  return drawerRoot;
}
function deletePortalRoot(portalId: string) {
  const drawerRoot = document.getElementById(portalId);
  drawerRoot?.remove();
}
interface DrawerProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
  direction?: 'left' | 'right'; // Assuming 'direction' can only be 'left' or 'right'.
  removeWhenClosed?: boolean;
  portalId: string;
}

const Drawer: FunctionComponent<DrawerProps> = ({
  isOpen,
  children,
  className,
  onClose,
  direction = 'right',
  removeWhenClosed = true,
  portalId,
}) => {
  const bodyRef = useRef(document.querySelector('body'));
  const portalRootRef = useRef(createPortalRoot(portalId));
  const isTransitioning = useMountTransition(isOpen, 300);

  useEffect(() => {
    const portalRoot = portalRootRef.current;
    bodyRef.current?.appendChild(portalRoot);

    return () => {
      portalRoot.remove();
      deletePortalRoot(portalId);
      if (bodyRef.current) bodyRef.current.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      if (isOpen) {
        bodyRef.current.style.overflow = 'hidden';
      } else {
        bodyRef.current.style.overflow = '';
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keyup', onKeyPress);
    }

    return () => {
      window.removeEventListener('keyup', onKeyPress);
    };
  }, [isOpen, onClose]);

  if (!isTransitioning && removeWhenClosed && !isOpen) {
    return null;
  }

  return createPortal(
    <FocusTrap active={isOpen}>
      <div
        aria-hidden={!isOpen}
        className={clsx('drawer-container', isOpen && 'open', isTransitioning && 'in')}
      >
        <div className={clsx('drawer', direction, className)} role="dialog">
          {children}
        </div>
        <div className="backdrop" onClick={onClose} aria-hidden="true" />
      </div>
    </FocusTrap>,
    portalRootRef.current,
  );
};

export default Drawer;
