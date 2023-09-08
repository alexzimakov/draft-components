import { expect, it } from 'vitest';
import { Button } from '../button/index.js';
import { ButtonGroup } from './button-group.js';
import { render, screen } from '../../test/test-utils.js';

it('renders without errors', () => {
  render(
    <ButtonGroup>
      <Button>Remove</Button>
      <Button>Add</Button>
    </ButtonGroup>,
  );

  expect(screen.getAllByRole('button')).toHaveLength(2);
});
