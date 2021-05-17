// noinspection ES6PreferShortImport

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from './breadcrumbs';
import { SvgIcon } from '../svg-icon';
import { houseFill } from '../../icons/house-fill';

it('renders without errors', () => {
  const items = [
    { href: '/', label: 'Home', icon: <SvgIcon icon={houseFill} /> },
    { href: '#breadcrumbs', label: 'Project' },
    { href: '#breadcrumbs', label: 'Awesome Project' },
  ];
  render(<Breadcrumbs items={items} />);

  const links = screen.getAllByRole('link');

  expect(links).toHaveLength(items.length);
  expect(links[0]).toHaveTextContent(items[0].label);
  expect(links[1]).toHaveTextContent(items[1].label);
  expect(links[2]).toHaveTextContent(items[2].label);
});

it('should render using custom renderer', () => {
  const items = [
    { href: '/', label: 'Home', icon: <SvgIcon icon={houseFill} /> },
    { href: '#breadcrumbs', label: 'Project' },
    { href: '#breadcrumbs', label: 'Awesome Project' },
  ];
  render(
    <Breadcrumbs
      renderLink={({ className, children }) => (
        <button className={className}>{children}</button>
      )}
      items={items}
    />
  );

  const buttons = screen.getAllByRole('button');

  expect(buttons).toHaveLength(items.length);
});
