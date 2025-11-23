import {
  type ComponentProps,
  type MouseEventHandler,
  type KeyboardEventHandler,
  type RefCallback,
  type JSX,
  useId,
  useState,
} from 'react';
import { classNames, tryToFocusElement } from '../../lib/react-helpers.js';
import { KeyboardKey } from '../../lib/keyboard-key.js';
import { useRefCallback } from '../../hooks/use-ref-callback.js';
import { Popover, type GetPopoverBackdropProps, type PopoverPlacement, type PopoverRenderAnchor } from '../popover/index.js';
import { MenuItem } from './menu-item.js';
import { MenuSeparator } from './menu-separator.js';

export type MenuOpenHandler = () => void;

export type MenuCloseHandler = () => void;

export type MenuApi = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export type MenuButtonRenderer = (props: {
  'ref': RefCallback<HTMLElement>;
  'id': string;
  'aria-haspopup': true;
  'aria-controls': string;
  'aria-expanded': boolean;
  'onClick': MouseEventHandler;
  'onKeyDown': KeyboardEventHandler;
}) => JSX.Element;

type MenuHTMLProps = ComponentProps<'div'>;

type MenuBaseProps = {
  defaultIsOpen?: boolean;
  shouldRenderBackdrop?: boolean;
  placement?: PopoverPlacement;
  onOpen?: MenuOpenHandler;
  onClose?: MenuCloseHandler;
  getBackdropProps?: GetPopoverBackdropProps;
  renderButton: MenuButtonRenderer;
};

export type MenuProps =
  & MenuBaseProps
  & Omit<MenuHTMLProps, keyof MenuBaseProps>;

export function Menu({
  defaultIsOpen = false,
  shouldRenderBackdrop = false,
  placement = 'bottom-start',
  className,
  children,
  onClick,
  onKeyDown,
  onMouseOver,
  onOpen,
  onClose,
  getBackdropProps,
  renderButton,
  ...props
}: MenuProps) {
  const id = useId();
  const menuId = props.id || id;
  const buttonId = `menu-button-${menuId}`;
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const open = useRefCallback(() => {
    setIsOpen(true);
    if (typeof onOpen === 'function') {
      onOpen();
    }
  });

  const close = useRefCallback(() => {
    setIsOpen(false);
    if (typeof onClose === 'function') {
      onClose();
    }
  });

  const focusNextMenuItem = () => {
    const menuitems = findMenuitems(menuId);
    let index = menuitems.findIndex((el) => el === document.activeElement);
    index += 1;
    if (index >= menuitems.length) {
      index = 0;
    }
    tryToFocusElement(menuitems[index]);
  };

  const focusPrevMenuItem = () => {
    const menuitems = findMenuitems(menuId);
    let index = menuitems.findIndex((el) => el === document.activeElement);
    index -= 1;
    if (index < 0) {
      index = menuitems.length - 1;
    }
    tryToFocusElement(menuitems[index]);
  };

  const focusFirstMenuitem = () => {
    const menuitems = findMenuitems(menuId);
    tryToFocusElement(menuitems[0]);
  };

  const focusLastMenuitem = () => {
    const menuitems = findMenuitems(menuId);
    tryToFocusElement(menuitems[menuitems.length - 1]);
  };

  const focusMenuitemByFirstChar = (char: string) => {
    const search = char.toLowerCase();
    const menuitems = findMenuitems(menuId);
    if (menuitems.length === 0) {
      return;
    }

    const activeMenuitemIndex = menuitems.findIndex((el) => el === document.activeElement);
    let fromIndex = activeMenuitemIndex + 1;
    if (fromIndex >= menuitems.length) {
      fromIndex = 0;
    }

    const menuitem = menuitems.find((menuitem, index) => {
      const label = (menuitem.textContent || '').trim().toLowerCase();
      return index >= fromIndex && label.startsWith(search);
    });
    tryToFocusElement(menuitem);
  };

  const handleButtonClick: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isOpen) {
      close();
    } else {
      open();
      window.setTimeout(() => {
        const menuElement = document.getElementById(menuId);
        if (menuElement) {
          tryToFocusElement(menuElement);
        }
      });
    }
  };

  const handleButtonKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
    if (
      event.key === KeyboardKey.ARROW_UP
      || event.key === KeyboardKey.ARROW_DOWN
      || event.key === KeyboardKey.ENTER
      || event.key === KeyboardKey.SPACE
    ) {
      event.preventDefault();
      event.stopPropagation();
      open();
      window.setTimeout(event.key === KeyboardKey.ARROW_UP
        ? focusLastMenuitem
        : focusFirstMenuitem);
    }
  };

  const handleMenuKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    let handled = false;
    if (event.key === KeyboardKey.ARROW_UP) {
      focusPrevMenuItem();
      handled = true;
    } else if (event.key === KeyboardKey.ARROW_DOWN) {
      focusNextMenuItem();
      handled = true;
    } else if (event.key === KeyboardKey.HOME) {
      focusFirstMenuitem();
      handled = true;
    } else if (event.key === KeyboardKey.END) {
      focusLastMenuitem();
      handled = true;
    } else if (event.key === KeyboardKey.TAB) {
      close();
      handled = true;
    } else if (event.key.match(/^\S$/)) {
      focusMenuitemByFirstChar(event.key);
      handled = true;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (typeof onKeyDown === 'function') {
      onKeyDown(event);
    }
  };

  const handleMenuMouseOver: MouseEventHandler<HTMLDivElement> = (event) => {
    const menuitem = findTargetMenuitem(event.currentTarget, event.target);
    if (menuitem && !menuitem.disabled) {
      tryToFocusElement(menuitem);
    }
    if (typeof onMouseOver === 'function') {
      onMouseOver(event);
    }
  };

  const handleMenuClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const menuitem = findTargetMenuitem(event.currentTarget, event.target);
    if (menuitem && !menuitem.disabled) {
      close();
    }
    if (typeof onClick === 'function') {
      onClick(event);
    }
  };

  const renderAnchor: PopoverRenderAnchor = ({ ref }) => {
    return renderButton({
      ref,
      'id': buttonId,
      'aria-haspopup': true,
      'aria-expanded': isOpen,
      'aria-controls': menuId,
      'onClick': handleButtonClick,
      'onKeyDown': handleButtonKeyDown,
    });
  };

  return (
    <Popover
      id={menuId}
      role="menu"
      className={classNames(className, 'dc-menu')}
      aria-labelledby={buttonId}
      tabIndex={0}
      shouldRenderBackdrop={shouldRenderBackdrop}
      placement={placement}
      isOpen={isOpen}
      onClose={close}
      onClick={handleMenuClick}
      onKeyDown={handleMenuKeyDown}
      onMouseOver={handleMenuMouseOver}
      getBackdropProps={getBackdropProps}
      renderAnchor={renderAnchor}
    >
      {children}
    </Popover>
  );
}
Menu.Item = MenuItem;
Menu.Separator = MenuSeparator;

function findMenuitems(menuId: string): HTMLButtonElement[] {
  const menuEl = window.document.getElementById(menuId);
  if (!menuEl) {
    return [];
  }

  const selectors = [
    'button[role="menuitem"]:not(:disabled)',
    'button[role="menuitemradio"]:not(:disabled)',
  ];
  const elements = menuEl.querySelectorAll<HTMLButtonElement>(selectors.join(','));
  return Array.from(elements);
}

function findTargetMenuitem(menuEl: Element, target: EventTarget): HTMLButtonElement | null {
  if (target instanceof Element) {
    let element: Element | null = target;
    while (element && element !== menuEl) {
      if (
        element instanceof HTMLButtonElement
        && (element.role === 'menuitem' || element.role === 'menuitemradio')
      ) {
        return element;
      }
      element = element.parentElement;
    }
  }
  return null;
}
