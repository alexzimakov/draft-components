import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import { ScopeButtons } from './scope-buttons';

it('renders without errors', () => {
  render(
    <ScopeButtons>
      <ScopeButtons.Button isActive={true}>First</ScopeButtons.Button>
      <ScopeButtons.Button>Second</ScopeButtons.Button>
      <ScopeButtons.Button>Third</ScopeButtons.Button>
    </ScopeButtons>
  );

  const groupEl = screen.getByRole('group');
  expect(within(groupEl).getAllByRole('button')).toHaveLength(3);
});
