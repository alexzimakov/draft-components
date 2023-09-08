import { expect, it } from 'vitest';
import { NavList } from './nav-list.js';
import { NavListTitle } from './nav-list-title.js';
import { NavListItem, NavListItemRenderFn } from './nav-list-item.js';
import { render, screen, within } from '../../test/test-utils.js';

it('renders without errors', () => {
  const title = 'Shared';
  const home = {
    href: '/home',
    label: 'Home',
  };
  const projects = {
    href: '/projects',
    label: 'Projects',
    badge: 7,
  };
  const reports = {
    href: '/reports',
    label: 'Reports',
    icon: <svg role="img" />,
  };
  const teamProjects = {
    href: '/team-projects',
    label: 'Team projects',
  };
  render(
    <NavList>
      <NavListItem href={home.href}>
        {home.label}
      </NavListItem>
      <NavListItem href={projects.href} badge={projects.badge}>
        {projects.label}
      </NavListItem>
      <NavListItem href={reports.href} icon={reports.icon}>
        {reports.label}
      </NavListItem>
      <NavListTitle>{title}</NavListTitle>
      <NavListItem href={teamProjects.href}>
        {teamProjects.label}
      </NavListItem>
    </NavList>,
  );

  screen.getByText(title);
  screen.getByRole('img');

  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(4);

  expect(links[0]).toHaveAttribute('href', home.href);
  expect(links[0]).toHaveTextContent(home.label);

  expect(links[1]).toHaveAttribute('href', projects.href);
  expect(links[1]).toHaveTextContent(projects.label + ' ' + projects.badge);

  expect(links[2]).toHaveAttribute('href', reports.href);
  expect(links[2]).toHaveTextContent(reports.label);
  within(links[2]).getByRole('img');

  expect(links[3]).toHaveAttribute('href', teamProjects.href);
  expect(links[3]).toHaveTextContent(teamProjects.label);
});

it('should render `NavItem` using custom render function', () => {
  const renderItem: NavListItemRenderFn = (props) => (
    <button {...props} />
  );
  render(
    <NavList>
      <NavListItem renderAs={renderItem}>Home</NavListItem>
      <NavListItem renderAs={renderItem}>Projects</NavListItem>
      <NavListItem renderAs={renderItem}>Reports</NavListItem>
    </NavList>,
  );

  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(3);
  expect(buttons[0]).toHaveTextContent('Home');
  expect(buttons[1]).toHaveTextContent('Projects');
  expect(buttons[2]).toHaveTextContent('Reports');
});
