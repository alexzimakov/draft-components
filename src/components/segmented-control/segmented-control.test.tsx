import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import { SegmentedControl } from './segmented-control';

it('renders without errors', () => {
  render(
    <SegmentedControl>
      <SegmentedControl.Item isActive={true}>First</SegmentedControl.Item>
      <SegmentedControl.Item>Second</SegmentedControl.Item>
      <SegmentedControl.Item>Third</SegmentedControl.Item>
    </SegmentedControl>
  );

  const groupEl = screen.getByRole('group');
  expect(within(groupEl).getAllByRole('button')).toHaveLength(3);
});
