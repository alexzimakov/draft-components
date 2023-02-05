import '../../tests/match-media.mock';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, within } from '@testing-library/react';
import { Menu } from './menu';
import { MenuItem } from './menu-item';
import { MenuSeparator } from './menu-separator';

it('renders without errors', () => {
  const label = 'Actions';
  const actions = ['Duplicate', 'Rename', 'Delete'];
  render(
    <Menu defaultIsOpen={true} button={label}>
      <MenuItem>{actions[0]}</MenuItem>
      <MenuItem>{actions[1]}</MenuItem>
      <MenuSeparator />
      <MenuItem>{actions[2]}</MenuItem>
    </Menu>
  );

  const anchor = screen.getByRole('button');
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

  within(menu).getByRole('separator');
});

it('renders without errors when the anchor property is a function', () => {
  const label = 'Actions';
  const actions = ['Duplicate', 'Rename', 'Delete'];
  render(
    <Menu
      defaultIsOpen={true}
      button={(props, context) => (
        <button
          ref={props.ref}
          id={props.id}
          className={context.isOpen ? 'open' : 'close'}
          aria-haspopup={props['aria-haspopup']}
          aria-expanded={props['aria-expanded']}
          aria-controls={props['aria-controls']}
          onClick={props.onClick}
          onKeyDown={props.onKeyDown}
        >
          {label}
        </button>
      )}
    >
      <MenuItem>{actions[0]}</MenuItem>
      <MenuItem>{actions[1]}</MenuItem>
      <MenuSeparator />
      <MenuItem>{actions[2]}</MenuItem>
    </Menu>
  );

  const anchor = screen.getByRole('button');
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

  within(menu).getByRole('separator');
});

it('should toggle the menu by click on the menu button', async () => {
  const user = userEvent.setup();
  const label = 'Actions';
  const actions = ['Duplicate', 'Rename', 'Delete'];
  render(
    <Menu button={label}>
      <MenuItem>{actions[0]}</MenuItem>
      <MenuItem>{actions[1]}</MenuItem>
      <MenuSeparator />
      <MenuItem>{actions[2]}</MenuItem>
    </Menu>
  );

  expect(screen.queryByRole('menu')).toBeNull();

  await user.click(screen.getByText(label));
  screen.getByRole('menu');
  expect(screen.getByTestId('menu-button')).toHaveFocus();

  await user.click(screen.getByText(label));
  await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
});

it('should close the menu when the Esc key pressed', async () => {
  const user = userEvent.setup();
  const label = 'Actions';
  const actions = ['Duplicate', 'Rename', 'Delete'];
  render(
    <Menu defaultIsOpen={true} button={label}>
      <MenuItem>{actions[0]}</MenuItem>
      <MenuItem>{actions[1]}</MenuItem>
      <MenuSeparator />
      <MenuItem>{actions[2]}</MenuItem>
    </Menu>
  );

  screen.getByRole('menu');

  await user.keyboard('{Escape}');
  await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
});

it('should close the menu when click on outside the menu', async () => {
  const user = userEvent.setup();
  const label = 'Actions';
  const actions = ['Duplicate', 'Rename', 'Delete'];
  const externalButtonTestId = 'external-button';
  render(
    <div>
      <button data-testid={externalButtonTestId}>Close menu</button>
      <Menu defaultIsOpen={true} button={label}>
        <MenuItem>{actions[0]}</MenuItem>
        <MenuItem>{actions[1]}</MenuItem>
        <MenuSeparator />
        <MenuItem>{actions[2]}</MenuItem>
      </Menu>
    </div>
  );

  screen.getByRole('menu');

  await user.click(screen.getByTestId(externalButtonTestId));
  await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
});

describe('should open the menu and focus the first menu item', () => {
  const renderMenu = () => {
    const user = userEvent.setup();
    const label = 'Actions';
    const actions = ['Duplicate', 'Rename', 'Delete'];
    render(
      <Menu button={label}>
        <MenuItem>{actions[0]}</MenuItem>
        <MenuItem>{actions[1]}</MenuItem>
        <MenuSeparator />
        <MenuItem>{actions[2]}</MenuItem>
      </Menu>
    );

    return { user, label, actions };
  };

  it('when the menu button is focused and ArrowDown key pressed', async () => {
    const { user } = renderMenu();

    expect(screen.queryByRole('menu')).toBeNull();
    await user.tab();
    await user.keyboard('{ArrowDown}');
    await screen.findByRole('menu');
    const [firstMenuItem] = screen.getAllByRole('menuitem');
    expect(firstMenuItem).toHaveFocus();
  });

  it('when the menu button is focused and Enter key pressed', async () => {
    const { user } = renderMenu();

    expect(screen.queryByRole('menu')).toBeNull();
    await user.tab();
    await user.keyboard('{Enter}');
    await screen.findByRole('menu');
    const [firstMenuItem] = screen.getAllByRole('menuitem');
    expect(firstMenuItem).toHaveFocus();
  });

  it('when the menu button is focused and Space key pressed', async () => {
    const { user } = renderMenu();

    expect(screen.queryByRole('menu')).toBeNull();
    await user.tab();
    await user.keyboard(' ');
    await screen.findByRole('menu');
    const [firstMenuItem] = screen.getAllByRole('menuitem');
    expect(firstMenuItem).toHaveFocus();
  });
});

it('should open the menu and focus the last menu item', async () => {
  const user = userEvent.setup();
  const label = 'Actions';
  const actions = ['Duplicate', 'Rename', 'Delete'];
  render(
    <Menu button={label}>
      <MenuItem>{actions[0]}</MenuItem>
      <MenuItem>{actions[1]}</MenuItem>
      <MenuSeparator />
      <MenuItem>{actions[2]}</MenuItem>
    </Menu>
  );

  expect(screen.queryByRole('menu')).toBeNull();

  await user.tab();
  await user.keyboard('{ArrowUp}');

  screen.getByRole('menu');
  const menuItems = screen.getAllByRole('menuitem');
  expect(menuItems[menuItems.length - 1]).toHaveFocus();
});

it('should navigate through the menu items using the keyboard', async () => {
  const user = userEvent.setup();
  const label = 'Actions';
  const actions = ['Duplicate', 'Rename', 'Delete'];
  render(
    <Menu button={label}>
      <MenuItem>{actions[0]}</MenuItem>
      <MenuItem>{actions[1]}</MenuItem>
      <MenuSeparator />
      <MenuItem>{actions[2]}</MenuItem>
    </Menu>
  );

  await user.tab();
  await user.keyboard('{ArrowUp}');

  const [first, second, third] = screen.getAllByRole('menuitem');
  expect(third).toHaveFocus();

  await user.keyboard('{ArrowDown}');
  expect(first).toHaveFocus();

  await user.keyboard('{ArrowDown}');
  expect(second).toHaveFocus();

  await user.keyboard('{ArrowUp}');
  expect(first).toHaveFocus();

  await user.keyboard('{ArrowUp}');
  expect(third).toHaveFocus();

  await user.keyboard('{home}');
  expect(first).toHaveFocus();

  await user.keyboard('{end}');
  expect(third).toHaveFocus();

  await user.keyboard('d');
  expect(first).toHaveFocus();

  await user.keyboard('i');
  expect(first).toHaveFocus();
});

it('should focus on the menu item when hovering over the mouse', async () => {
  const user = userEvent.setup();
  const label = 'Actions';
  const actions = ['Duplicate', 'Rename', 'Delete'];
  const onMouseEnterMock = jest.fn();
  render(
    <Menu defaultIsOpen={true} button={label}>
      <MenuItem onMouseEnter={onMouseEnterMock}>{actions[0]}</MenuItem>
      <MenuItem onMouseEnter={onMouseEnterMock}>{actions[1]}</MenuItem>
      <MenuSeparator />
      <MenuItem onMouseEnter={onMouseEnterMock}>{actions[2]}</MenuItem>
    </Menu>
  );

  const [first, second] = screen.getAllByRole('menuitem');

  await user.hover(first);
  expect(first).toHaveFocus();

  await user.hover(second);
  expect(second).toHaveFocus();

  expect(onMouseEnterMock).toHaveBeenCalledTimes(2);
});

it('should close the menu when click on any menu item', async () => {
  const user = userEvent.setup();
  const label = 'Actions';
  const actions = ['Duplicate', 'Rename', 'Delete'];
  const onClickMock = jest.fn();
  render(
    <Menu defaultIsOpen={true} button={label}>
      <MenuItem onClick={onClickMock}>{actions[0]}</MenuItem>
      <MenuItem onClick={onClickMock}>{actions[1]}</MenuItem>
      <MenuSeparator />
      <MenuItem onClick={onClickMock}>{actions[2]}</MenuItem>
    </Menu>
  );

  const [first] = screen.getAllByRole('menuitem');

  await user.click(first);
  await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
  expect(onClickMock).toHaveBeenCalledTimes(1);
});
