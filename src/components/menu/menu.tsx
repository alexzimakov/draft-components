import {
  Children,
  cloneElement,
  isValidElement,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';
import { KeyCode } from '../../lib/keyboard-helpers';
import { uniqueId } from '../../lib/util';
import { isFunction } from '../../lib/guards';
import { BoxElevation } from '../box';
import { Alignment, Placement } from '../positioner/types';
import { Popover } from '../popover';
import { Button } from '../button';
import { MenuButton } from './menu-button';
import { classNames } from '../../lib/react-helpers';

type RenderLabel = (props: {
  id: string;
  isOpen: boolean;
  'aria-controls': string;
  'aria-haspopup': boolean;
  'aria-expanded': boolean;
  onClick: MouseEventHandler;
  onKeyDown: KeyboardEventHandler;
}) => JSX.Element;

export type MenuProps = {
  className?: string;
  elevation?: BoxElevation;
  placement?: Placement;
  alignment?: Alignment;
  anchorGap?: number;
  viewportGap?: number;
  defaultIsOpen?: boolean;
  label: ReactNode | RenderLabel;
  children: ReactNode;
};

export function Menu({
  className,
  elevation,
  placement,
  alignment,
  anchorGap,
  viewportGap,
  defaultIsOpen = false,
  label,
  children,
}: MenuProps) {
  const menuId = useRef(uniqueId('dc_menu_'));
  const menuButtonId = useRef(uniqueId('dc_menu_button_'));
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  const openMenu = useCallback(() => setIsOpen(true), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  function handleClick(): void {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function handleKeyDown(event: KeyboardEvent): void {
    const isArrowUpPressed = event.key === KeyCode.arrowUp;
    const isArrowDownPressed = event.key === KeyCode.arrowDown;
    if (isArrowUpPressed || isArrowDownPressed) {
      event.preventDefault();
      openMenu();
      window.setTimeout(() => {
        const menuItems = getMenuItems(menuId.current);
        const menuItem = isArrowDownPressed
          ? menuItems[0]
          : menuItems[menuItems.length - 1];
        if (menuItem) {
          menuItem.focus();
        }
      }, 0);
    }
  }

  function menuNavigate(event: KeyboardEvent): void {
    const menuItems = getMenuItems(menuId.current);
    if (menuItems.length === 0) {
      return;
    }

    let activeItemIndex = menuItems.findIndex(
      (item) => item === document.activeElement
    );
    if (event.key === KeyCode.arrowDown) {
      activeItemIndex += 1;
      if (activeItemIndex === menuItems.length) {
        activeItemIndex = 0;
      }
    } else if (event.key === KeyCode.arrowUp) {
      activeItemIndex -= 1;
      if (activeItemIndex < 0) {
        activeItemIndex = menuItems.length - 1;
      }
    } else if (event.key === KeyCode.end) {
      activeItemIndex = menuItems.length - 1;
    } else if (event.key === KeyCode.home) {
      activeItemIndex = 0;
    } else if (event.key.match(/^[A-Za-z]$/)) {
      const searchString = event.key.toLowerCase();
      const index = menuItems.findIndex((item) => {
        const label = item.textContent || '';
        return label.toLowerCase().startsWith(searchString);
      });
      if (index > -1) {
        activeItemIndex = index;
      }
    }

    const activeMenuItem = menuItems[activeItemIndex];
    if (activeMenuItem && activeMenuItem !== document.activeElement) {
      event.preventDefault();
      activeMenuItem.focus();
    }
  }

  return (
    <Popover
      className={classNames('dc-menu', className)}
      elevation={elevation}
      placement={placement}
      alignment={alignment}
      anchorGap={anchorGap}
      viewportGap={viewportGap}
      isOpen={isOpen}
      onClose={closeMenu}
      anchor={
        isFunction(label) ? (
          label({
            isOpen,
            id: menuButtonId.current,
            'aria-haspopup': true,
            'aria-expanded': isOpen,
            'aria-controls': menuId.current,
            onClick: handleClick,
            onKeyDown: handleKeyDown,
          })
        ) : (
          <Button
            id={menuButtonId.current}
            aria-haspopup={true}
            aria-expanded={isOpen}
            aria-controls={menuId.current}
            data-testid="dc-menu-anchor"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          >
            {label}
          </Button>
        )
      }
    >
      <div
        className="dc-menu__content"
        id={menuId.current}
        role="menu"
        aria-labelledby={menuButtonId.current}
        onKeyDown={menuNavigate}
      >
        {Children.map(children, (child) => {
          if (isValidElement(child) && child.type === MenuButton) {
            return cloneElement(child, {
              onClick: (event: MouseEvent<HTMLButtonElement>): void => {
                closeMenu();
                const onClick = child.props.onClick;
                if (isFunction(onClick)) {
                  onClick(event);
                }
              },
              onMouseEnter: (event: MouseEvent<HTMLButtonElement>): void => {
                event.currentTarget.focus();
                const onMouseEnter = child.props.onMouseEnter;
                if (isFunction(onMouseEnter)) {
                  onMouseEnter(event);
                }
              },
            });
          }

          return child;
        })}
      </div>
    </Popover>
  );
}

function getMenuItems(menuId: string): HTMLElement[] {
  const menu = document.getElementById(menuId);
  if (!menu) {
    return [];
  } else {
    return Array.from(menu.querySelectorAll('button[role="menuitem"]'));
  }
}
