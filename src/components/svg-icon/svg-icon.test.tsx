import * as React from 'react';
import { render, within, screen } from '@testing-library/react';
import { SvgIcon } from './svg-icon';
import { infoIcon } from './icons';

it('renders without errors', () => {
  const size = 24;
  render(<SvgIcon icon={infoIcon} size={size} />);

  const svgIconEl = screen.getByTestId(`svg-icon-${infoIcon.name}`);

  expect(svgIconEl).toHaveAttribute('width', size.toString());
  expect(svgIconEl).toHaveAttribute('height', size.toString());
});

it('should fill with gradient', () => {
  render(
    <SvgIcon
      linearGradient={['to bottom', '#666', '#333']}
      icon={infoIcon}
      role="img"
      aria-hidden={false}
    />
  );

  const svgIconEl = screen.getByRole('img');
  const linearGradientEl = within(svgIconEl).getByTestId('svg-icon-gradient');

  expect(svgIconEl).toHaveAttribute('fill', `url(#${linearGradientEl.id})`);
});
