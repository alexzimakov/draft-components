import * as React from 'react';
import { render, within, screen } from '@testing-library/react';
import { SvgIcon } from './svg-icon';
import * as icons from './icons';

it('renders without errors', () => {
  const size = 24;
  render(<SvgIcon icon={icons.info} size={size} />);

  const svgIconEl = screen.getByTestId(`svg-icon-${icons.info.name}`);

  expect(svgIconEl).toHaveAttribute('width', size.toString());
  expect(svgIconEl).toHaveAttribute('height', size.toString());
});

it('should fill with gradient', () => {
  render(
    <SvgIcon
      linearGradient={['to bottom', '#666', '#333']}
      icon={icons.info}
      role="img"
      aria-hidden={false}
    />
  );

  const svgIconEl = screen.getByRole('img');
  const linearGradientEl = within(svgIconEl).getByTestId('svg-icon-gradient');

  expect(svgIconEl).toHaveAttribute('fill', `url(#${linearGradientEl.id})`);
});
