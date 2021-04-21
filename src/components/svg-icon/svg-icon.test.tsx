import * as React from 'react';
import { render, within, screen } from '@testing-library/react';
import { SvgIcon, SvgIconProps } from './svg-icon';
import * as icons from './icons';

it('renders without errors', () => {
  const size = 24;
  render(<SvgIcon icon={icons.info} size={size} />);

  const svgIconEl = screen.getByTestId(`svg-icon-${icons.info.name}`);

  expect(svgIconEl).toHaveAttribute('width', size.toString());
  expect(svgIconEl).toHaveAttribute('height', size.toString());
});

it('should fill with gradient', () => {
  const props: SvgIconProps = {
    linearGradient: ['to bottom', '#666', '#333'],
    icon: icons.info,
    role: 'img',
    'aria-hidden': false,
  };
  const { rerender } = render(<SvgIcon {...props} />);

  const svgIconEl = screen.getByRole('img');
  const linearGradientEl = within(svgIconEl).getByTestId('linear-gradient-def');

  expect(svgIconEl).toHaveAttribute('fill', `url(#${linearGradientEl.id})`);
  expect(linearGradientEl).toHaveAttribute('x1', '0');
  expect(linearGradientEl).toHaveAttribute('x2', '0');
  expect(linearGradientEl).toHaveAttribute('y1', '0');
  expect(linearGradientEl).toHaveAttribute('y2', '1');

  rerender(<SvgIcon {...props} linearGradient={['to top', '#666', '#333']} />);
  expect(linearGradientEl).toHaveAttribute('x1', '0');
  expect(linearGradientEl).toHaveAttribute('x2', '0');
  expect(linearGradientEl).toHaveAttribute('y1', '1');
  expect(linearGradientEl).toHaveAttribute('y2', '0');

  rerender(<SvgIcon {...props} linearGradient={['to left', '#666', '#333']} />);
  expect(linearGradientEl).toHaveAttribute('x1', '1');
  expect(linearGradientEl).toHaveAttribute('x2', '0');
  expect(linearGradientEl).toHaveAttribute('y1', '0');
  expect(linearGradientEl).toHaveAttribute('y2', '0');

  rerender(
    <SvgIcon {...props} linearGradient={['to right', '#666', '#333']} />
  );
  expect(linearGradientEl).toHaveAttribute('x1', '0');
  expect(linearGradientEl).toHaveAttribute('x2', '1');
  expect(linearGradientEl).toHaveAttribute('y1', '0');
  expect(linearGradientEl).toHaveAttribute('y2', '0');
});
