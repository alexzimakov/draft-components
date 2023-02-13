import { render, screen } from '@testing-library/react';
import { ButtonGroup } from './button-group';
import { Button } from '../button';

it('renders without errors', () => {
  render(
    <ButtonGroup>
      <Button>Remove</Button>
      <Button>Add</Button>
    </ButtonGroup>,
  );

  expect(screen.getAllByRole('button')).toHaveLength(2);
});
