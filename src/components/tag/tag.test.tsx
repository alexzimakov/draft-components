import { it } from 'vitest';
import { Tag } from './tag.js';
import { render, screen } from '../../test/test-utils.js';

it('renders without errors', () => {
  const text = 'Tag text';
  render(
    <Tag>
      <svg role="img" />
      {text}
    </Tag>,
  );

  screen.getByText(text);
  screen.getByRole('img');
});
