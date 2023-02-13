import { render, screen } from '@testing-library/react';
import { Tag } from './tag';

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
