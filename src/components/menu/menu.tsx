import {
  ComponentProps,
  MouseEventHandler,
  KeyboardEventHandler,
  RefCallback,
  JSX,
  useId,
  useState,
} from 'react';
import { classNames, focusElement } from '../../lib/react-helpers.js';
import { useRefCallback } from '../../hooks/use-ref-callback.js';
import { Popover, PopoverPlacement, PopoverRenderAnchor } from '../popover/index.js';
import { MenuItem } from './menu-item.js';
import { MenuSeparator } from './menu-separator.js';

type MenuHTMLProps = ComponentProps<'div'>;

type MenuBaseProps = {
  defaultIsOpen?: boolean;
  placement?: PopoverPlacement;
  renderButton: MenuRenderButton;
  onOpen?: MenuOpenHandler;
  onClose?: MenuCloseHandler;
};

export type MenuOpenHandler = () => void;

export type MenuCloseHandler = () => void;

export type MenuApi = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export type MenuRenderButton = (props: {
  'ref': RefCallback<HTMLElement>;
  'id': string;
  'aria-haspopup': true;
  'aria-controls': string;
  'aria-expanded': boolean;
  'onClick': MouseEventHandler;
  'onKeyDown': KeyboardEventHandler;
}) => JSX.Element;

export type MenuProps =
  & MenuBaseProps
  & Omit<MenuHTMLProps, keyof MenuBaseProps>;

export function Menu({
  defaultIsOpen = false,
  placement = 'bottom-start',
  className,
  children,
  renderButton,
  onClick,
  onKeyDown,
  onMouseOver,
  onOpen,
  onClose,
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
    focusElement(menuitems[index]);
  };

  const focusPrevMenuItem = () => {
    const menuitems = findMenuitems(menuId);
    let index = menuitems.findIndex((el) => el === document.activeElement);
    index -= 1;
    if (index < 0) {
      index = menuitems.length - 1;
    }
    focusElement(menuitems[index]);
  };

  const focusFirstMenuitem = () => {
    const menuitems = findMenuitems(menuId);
    focusElement(menuitems[0]);
  };

  const focusLastMenuitem = () => {
    const menuitems = findMenuitems(menuId);
    focusElement(menuitems[menuitems.length - 1]);
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
    focusElement(menuitem);
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
          menuElement.focus();
        }
      });
    }
  };

  const handleButtonKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
    if (
      event.key === 'ArrowUp'
      || event.key === 'ArrowDown'
      || event.key === 'Enter'
      || event.key === ' '
    ) {
      event.preventDefault();
      event.stopPropagation();
      open();
      window.setTimeout(event.key === 'ArrowUp'
        ? focusLastMenuitem
        : focusFirstMenuitem);
    }
  };

  const handleMenuKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    let handled = false;
    if (event.key === 'ArrowUp') {
      focusPrevMenuItem();
      handled = true;
    } else if (event.key === 'ArrowDown') {
      focusNextMenuItem();
      handled = true;
    } else if (event.key === 'Home') {
      focusFirstMenuitem();
      handled = true;
    } else if (event.key === 'End') {
      focusLastMenuitem();
      handled = true;
    } else if (event.key === 'Tab') {
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
      focusElement(menuitem);
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
      placement={placement}
      isOpen={isOpen}
      onClose={close}
      renderAnchor={renderAnchor}
      onClick={handleMenuClick}
      onKeyDown={handleMenuKeyDown}
      onMouseOver={handleMenuMouseOver}
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
