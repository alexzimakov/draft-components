import userEvent from '@testing-library/user-event';
import { act, render, screen, within } from '@testing-library/react';
import { Menu } from './menu';
import { MenuButton } from './menu-button';
import { MenuDivider } from './menu-divider';

const label = 'Actions';
const actions = ['Duplicate', 'Rename', 'Delete'];

it('renders without errors', () => {
  render(
    <Menu defaultIsOpen={true} label={label}>
      <MenuButton>{actions[0]}</MenuButton>
      <MenuButton>{actions[1]}</MenuButton>
      <MenuDivider />
      <MenuButton>{actions[2]}</MenuButton>
    </Menu>
  );

  const anchor = screen.getByTestId('dc-menu-anchor');
  const menu = screen.getByRole('menu');

  expect(menu).toHaveAttribute('aria-labelledby', anchor.getAttribute('id'));
  expect(anchor).toHaveTextContent(label);
  expect(anchor).toHaveAttribute('aria-haspopup', 'true');
  expect(anchor).toHaveAttribute('aria-expanded', 'true');
  expect(anchor).toHaveAttribute('aria-controls', menu.getAttribute('id'));

  const menuItems = within(menu).getAllByRole('menuitem');
  expect(menuItems).toHaveLength(3);
  expect(menuItems[0]).toHaveTextContent(actions[0]);
  expect(menuItems[1]).toHaveTextContent(actions[1]);
  expect(menuItems[2]).toHaveTextContent(actions[2]);
  within(menu).getByTestId('dc-menu-divider');
});

it('renders without errors when label property is function', () => {
  const anchorTestId = 'menu-anchor';
  render(
    <Menu
      defaultIsOpen={true}
      label={({ isOpen, ...props }) => (
        <button
          {...props}
          className={isOpen ? 'open' : 'close'}
          data-testid={anchorTestId}
        >
          {label}
        </button>
      )}
    >
      <MenuButton>{actions[0]}</MenuButton>
      <MenuButton>{actions[1]}</MenuButton>
      <MenuDivider />
      <MenuButton>{actions[2]}</MenuButton>
    </Menu>
  );

  const anchor = screen.getByTestId(anchorTestId);
  const menu = screen.getByRole('menu');

  expect(menu).toHaveAttribute('aria-labelledby', anchor.getAttribute('id'));
  expect(anchor).toHaveTextContent(label);
  expect(anchor).toHaveAttribute('aria-haspopup', 'true');
  expect(anchor).toHaveAttribute('aria-expanded', 'true');
  expect(anchor).toHaveAttribute('aria-controls', menu.getAttribute('id'));

  const menuItems = within(menu).getAllByRole('menuitem');
  expect(menuItems).toHaveLength(3);
  expect(menuItems[0]).toHaveTextContent(actions[0]);
  expect(menuItems[1]).toHaveTextContent(actions[1]);
  expect(menuItems[2]).toHaveTextContent(actions[2]);
  within(menu).getByTestId('dc-menu-divider');
});

it('should open the menu by click on the label', () => {
  jest.useFakeTimers();

  render(
    <Menu label={label}>
      <MenuButton>{actions[0]}</MenuButton>
      <MenuButton>{actions[1]}</MenuButton>
      <MenuDivider />
      <MenuButton>{actions[2]}</MenuButton>
    </Menu>
  );

  expect(screen.queryByRole('menu')).toBeNull();

  userEvent.click(screen.getByText(label));
  screen.getByRole('menu');

  userEvent.click(screen.getByText(label));
  act(() => {
    jest.runOnlyPendingTimers();
  });
  expect(screen.queryByRole('menu')).toBeNull();
});

it('should close the menu when Esc key pressed', () => {
  jest.useFakeTimers();

  render(
    <Menu defaultIsOpen={true} label={label}>
      <MenuButton>{actions[0]}</MenuButton>
      <MenuButton>{actions[1]}</MenuButton>
      <MenuDivider />
      <MenuButton>{actions[2]}</MenuButton>
    </Menu>
  );

  screen.getByRole('menu');

  userEvent.keyboard('{esc}');
  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.queryByRole('menu')).toBeNull();
});

it('should close the menu when click on outside the menu', () => {
  jest.useFakeTimers();

  const externalButtonTestId = 'external-button';
  render(
    <div>
      <button data-testid={externalButtonTestId}>Close menu</button>
      <Menu defaultIsOpen={true} label={label}>
        <MenuButton>{actions[0]}</MenuButton>
        <MenuButton>{actions[1]}</MenuButton>
        <MenuDivider />
        <MenuButton>{actions[2]}</MenuButton>
      </Menu>
    </div>
  );

  screen.getByRole('menu');

  userEvent.click(screen.getByTestId(externalButtonTestId));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.queryByRole('menu')).toBeNull();
});

it(
  'should open the menu and moves focus to the first item ' +
  'when Arrow Down key pressed',
  () => {
    jest.useFakeTimers();

    render(
      <Menu label={label}>
        <MenuButton>{actions[0]}</MenuButton>
        <MenuButton>{actions[1]}</MenuButton>
        <MenuDivider />
        <MenuButton>{actions[2]}</MenuButton>
      </Menu>
    );

    expect(screen.queryByRole('menu')).toBeNull();

    userEvent.tab();
    userEvent.keyboard('{ArrowDown}');

    screen.getByRole('menu');

    act(() => {
      jest.runOnlyPendingTimers();
    });
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems[0]).toHaveFocus();
  }
);

it(
  'should open the menu and moves focus to the last item ' +
  'when Arrow Up key pressed',
  () => {
    jest.useFakeTimers();

    render(
      <Menu label={label}>
        <MenuButton>{actions[0]}</MenuButton>
        <MenuButton>{actions[1]}</MenuButton>
        <MenuDivider />
        <MenuButton>{actions[2]}</MenuButton>
      </Menu>
    );

    expect(screen.queryByRole('menu')).toBeNull();

    userEvent.tab();
    userEvent.keyboard('{ArrowUp}');

    screen.getByRole('menu');

    act(() => {
      jest.runOnlyPendingTimers();
    });
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems[menuItems.length - 1]).toHaveFocus();
  }
);

it('should navigate through menu items using keyboard', () => {
  jest.useFakeTimers();

  render(
    <Menu label={label}>
      <MenuButton>{actions[0]}</MenuButton>
      <MenuButton>{actions[1]}</MenuButton>
      <MenuDivider />
      <MenuButton>{actions[2]}</MenuButton>
    </Menu>
  );

  userEvent.tab();
  userEvent.keyboard('{ArrowUp}');
  act(() => {
    jest.runOnlyPendingTimers();
  });

  const [first, second, third] = screen.getAllByRole('menuitem');

  expect(third).toHaveFocus();

  userEvent.keyboard('{ArrowDown}');
  expect(first).toHaveFocus();

  userEvent.keyboard('{ArrowDown}');
  expect(second).toHaveFocus();

  userEvent.keyboard('{ArrowUp}');
  expect(first).toHaveFocus();

  userEvent.keyboard('{ArrowUp}');
  expect(third).toHaveFocus();

  userEvent.keyboard('{home}');
  expect(first).toHaveFocus();

  userEvent.keyboard('{end}');
  expect(third).toHaveFocus();

  userEvent.keyboard('d');
  expect(first).toHaveFocus();

  userEvent.keyboard('i');
  expect(first).toHaveFocus();
});

it('should focus menu item on mouse hover', () => {
  const onMouseEnterMock = jest.fn();
  render(
    <Menu defaultIsOpen={true} label={label}>
      <MenuButton onMouseEnter={onMouseEnterMock}>{actions[0]}</MenuButton>
      <MenuButton onMouseEnter={onMouseEnterMock}>{actions[1]}</MenuButton>
      <MenuDivider />
      <MenuButton onMouseEnter={onMouseEnterMock}>{actions[2]}</MenuButton>
    </Menu>
  );

  const menuItems = screen.getAllByRole('menuitem');

  userEvent.hover(menuItems[0]);
  expect(menuItems[0]).toHaveFocus();

  userEvent.hover(menuItems[2]);
  expect(menuItems[2]).toHaveFocus();

  expect(onMouseEnterMock).toHaveBeenCalledTimes(2);
});

it('should close the menu when click on any menu item', () => {
  jest.useFakeTimers();

  const onClickMock = jest.fn();
  render(
    <Menu defaultIsOpen={true} label={label}>
      <MenuButton onClick={onClickMock}>{actions[0]}</MenuButton>
      <MenuButton onClick={onClickMock}>{actions[1]}</MenuButton>
      <MenuDivider />
      <MenuButton onClick={onClickMock}>{actions[2]}</MenuButton>
    </Menu>
  );

  const menuItems = screen.getAllByRole('menuitem');

  userEvent.click(menuItems[0]);
  act(() => {
    jest.runOnlyPendingTimers();
  });
  expect(screen.queryByRole('menu')).toBeNull();
  expect(onClickMock).toHaveBeenCalledTimes(1);
});
