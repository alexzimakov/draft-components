import { KeyboardKeys } from '../../lib/keyboard-keys.js';
import {
  Children,
  ComponentPropsWithoutRef,
  JSX,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  RefCallback,
  cloneElement,
  isValidElement,
  useId,
  useState,
} from 'react';
import { classNames, focusElement } from '../../lib/react-helpers.js';
import { assertIfNullable } from '../../lib/helpers.js';
import { Button, ButtonSize, ButtonStyle, ButtonTint } from '../button/index.js';
import { Popover, PopoverAlignment, PopoverAnchorRenderFn, PopoverPlacement } from '../popover/index.js';
import { MenuItem, MenuItemProps } from './menu-item.js';
import { MenuSeparator } from './menu-separator.js';

export type MenuButtonRenderFn = (props: {
  ref: RefCallback<HTMLElement>;
  id: string;
  'aria-haspopup': true;
  'aria-expanded': boolean;
  'aria-controls': string;
  onClick: MouseEventHandler,
  onKeyDown: KeyboardEventHandler,
}, context: {
  isOpen: boolean;
  openMenu: () => void,
  closeMenu: () => void,
}) => JSX.Element;


type MenuHTMLProps = ComponentPropsWithoutRef<'ul'>;
export type MenuPlacement = PopoverPlacement;
export type MenuAlignment = PopoverAlignment;
export type MenuProps = {
  defaultIsOpen?: boolean;
  placement?: MenuPlacement;
  alignment?: MenuAlignment;
  onOpen?: () => void;
  onClose?: () => void;
  button: ReactNode | MenuButtonRenderFn;
  buttonClassName?: string;
  buttonStyle?: ButtonStyle;
  buttonSize?: ButtonSize;
  buttonTint?: ButtonTint;
} & MenuHTMLProps;

export function Menu({
  defaultIsOpen = false,
  placement = 'bottom',
  alignment = 'start',
  buttonClassName = '',
  buttonStyle = 'filled',
  buttonSize = 'sm',
  buttonTint = 'gray',
  button,
  className,
  children,
  onOpen,
  onClose,
  onKeyDown,
  ...props
}: MenuProps) {
  const id = useId();
  const menuId = props.id || id;
  const buttonId = `menu-button-${menuId}`;
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const openMenu = () => {
    setIsOpen(true);
    onOpen?.();
  };

  const closeMenu = () => {
    setIsOpen(false);
    onClose?.();
  };

  const focusMenuButton = () => {
    const menuButton = document.getElementById(buttonId);
    assertIfNullable(menuButton, `Unable to get DOM element #${buttonId}`);
    focusElement(menuButton);
  };

  const focusNextMenuItem = () => {
    const menuItems = getMenuItems(menuId);
    let index = menuItems.findIndex((el) => el === document.activeElement);
    index += 1;
    if (index >= menuItems.length) {
      index = 0;
    }
    focusElement(menuItems[index]);
  };

  const focusPrevMenuItem = () => {
    const menuItems = getMenuItems(menuId);
    let index = menuItems.findIndex((el) => el === document.activeElement);
    index -= 1;
    if (index < 0) {
      index = menuItems.length - 1;
    }
    focusElement(menuItems[index]);
  };

  const focusFirstMenuItem = () => {
    const menuItems = getMenuItems(menuId);
    focusElement(menuItems[0]);
  };

  const focusLastMenuItem = () => {
    const menuItems = getMenuItems(menuId);
    focusElement(menuItems[menuItems.length - 1]);
  };

  const focusMenuItemByFirstChar = (char: string) => {
    if (char.length > 1) {
      return;
    }
    char = char.toLowerCase();

    const menuItems = getMenuItems(menuId);
    if (menuItems.length === 0) {
      return;
    }

    const firstChars = menuItems.map((el) => {
      if (el.textContent) {
        return el.textContent[0].toLowerCase();
      }
      return '';
    });

    const activeMenuItemIndex = menuItems.findIndex(
      (el) => el === document.activeElement,
    );
    let fromIndex = activeMenuItemIndex + 1;
    if (fromIndex >= firstChars.length) {
      fromIndex = 0;
    }

    let index = firstChars.indexOf(char, fromIndex);
    if (index === -1 && fromIndex !== 0) {
      index = firstChars.indexOf(char);
    }

    focusElement(menuItems[index]);
  };

  const handleButtonClick: MouseEventHandler<HTMLElement> = (event) => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }

    focusMenuButton();
    event.preventDefault();
    event.stopPropagation();
  };

  const handleButtonKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
    if (
      event.key === KeyboardKeys.ArrowUp ||
      event.key === KeyboardKeys.ArrowDown ||
      event.key === KeyboardKeys.Enter ||
      event.key === KeyboardKeys.Space
    ) {
      openMenu();
      window.setTimeout(event.key === KeyboardKeys.ArrowUp
        ? focusLastMenuItem
        : focusFirstMenuItem);

      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleMenuKeyDown: KeyboardEventHandler<HTMLUListElement> = (event) => {
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    let handled = false;
    if (event.key === KeyboardKeys.ArrowUp) {
      focusPrevMenuItem();
      handled = true;
    } else if (event.key === KeyboardKeys.ArrowDown) {
      focusNextMenuItem();
      handled = true;
    } else if (event.key === KeyboardKeys.Home) {
      focusFirstMenuItem();
      handled = true;
    } else if (event.key === KeyboardKeys.End) {
      focusLastMenuItem();
      handled = true;
    } else if (event.key === KeyboardKeys.Tab) {
      closeMenu();
      if (event.shiftKey) {
        focusMenuButton();
        handled = true;
      }
    } else if (event.key.match(/^\S$/)) {
      focusMenuItemByFirstChar(event.key);
      handled = true;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }

    onKeyDown?.(event);
  };

  const renderAnchor: PopoverAnchorRenderFn = ({ ref }) => {
    if (typeof button === 'function') {
      return button({
        ref,
        'id': buttonId,
        'aria-haspopup': true,
        'aria-expanded': isOpen,
        'aria-controls': menuId,
        'onClick': handleButtonClick,
        'onKeyDown': handleButtonKeyDown,
      }, {
        isOpen,
        openMenu,
        closeMenu,
      });
    }

    return (
      <Button
        data-testid="menu-button"
        ref={ref}
        id={buttonId}
        aria-haspopup={true}
        aria-expanded={isOpen}
        aria-controls={menuId}
        className={buttonClassName}
        buttonStyle={buttonStyle}
        size={buttonSize}
        tint={buttonTint}
        onClick={handleButtonClick}
        onKeyDown={handleButtonKeyDown}
      >
        {button}
      </Button>
    );
  };

  return (
    <Popover
      className="dc-menu__container"
      placement={placement}
      alignment={alignment}
      anchor={renderAnchor}
      isOpen={isOpen}
      onClose={closeMenu}
    >
      <ul
        {...props}
        className={classNames('dc-menu', className)}
        role="menu"
        id={menuId}
        aria-labelledby={buttonId}
        onKeyDown={handleMenuKeyDown}
      >
        {Children.map(children, (child) => {
          if (isMenuItem(child)) {
            const props = child.props;
            const onClick: typeof props['onClick'] = (event) => {
              props.onClick?.(event);
              closeMenu();
            };
            const onMouseEnter: typeof props['onMouseEnter'] = (event) => {
              focusElement(event.currentTarget);
              props.onMouseEnter?.(event);
            };

            return cloneElement(child, { onClick, onMouseEnter });
          }

          return child;
        })}
      </ul>
    </Popover>
  );
}
Menu.Item = MenuItem;
Menu.Separator = MenuSeparator;

function isMenuItem(el: ReactNode): el is ReactElement<MenuItemProps> {
  return isValidElement(el) && el.type === MenuItem;
}

function getMenuItems(menuId: string): HTMLButtonElement[] {
  const menuEl = window.document.getElementById(menuId);
  if (!menuEl) {
    return [];
  }

  const nodes = menuEl.querySelectorAll<HTMLButtonElement>(
    'button[role="menuitem"], button[role="menuitemradio"]',
  );
  return Array.from(nodes);
}
