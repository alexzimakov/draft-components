import { render, within, screen } from '@testing-library/react';
import { SvgIcon } from './svg-icon';
import { alarm } from '../../icons/alarm';
import type { SvgIconProps } from './svg-icon';

it('renders without errors', () => {
  const size = 24;
  render(<SvgIcon icon={alarm} size={size} />);

  const svgIconEl = screen.getByTestId(`svg-icon-${alarm.name}`);

  expect(svgIconEl).toHaveAttribute('width', size.toString());
  expect(svgIconEl).toHaveAttribute('height', size.toString());
});

it('should fill with gradient', () => {
  const props: SvgIconProps = {
    linearGradient: ['to bottom', '#666', '#333'],
    icon: alarm,
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
