import { Button } from '../button';
import { ButtonGroup } from './button-group';
import { expect, it } from 'vitest';
import { render, screen } from '../../test/test-utils';

it('renders without errors', () => {
  render(
    <ButtonGroup>
      <Button>Remove</Button>
      <Button>Add</Button>
    </ButtonGroup>,
  );

  expect(screen.getAllByRole('button')).toHaveLength(2);
});
