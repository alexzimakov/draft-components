import { render, screen } from '@testing-library/react';
import { ButtonsGroup } from './buttons-group';
import { Button } from '../button';

it('renders without errors', () => {
  render(
    <ButtonsGroup>
      <Button>Day</Button>
      <Button>Week</Button>
      <Button>Month</Button>
      <Button>Year</Button>
    </ButtonsGroup>
  );

  expect(screen.getAllByRole('button')).toHaveLength(4);
});
