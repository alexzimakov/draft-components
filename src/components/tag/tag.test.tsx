import { Tag } from './tag';
import { it } from 'vitest';
import { render, screen } from '../../test/test-utils';

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
