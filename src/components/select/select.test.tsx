import { render } from '@testing-library/react';
import { Select } from './select';

const options = (
  <>
    <option>Chrome</option>
    <option>Firefox</option>
    <option>Internet Explorer</option>
    <option>Opera</option>
    <option>Safari</option>
    <option>Microsoft Edge</option>
  </>
);

it('renders without errors', () => {
  render(<Select>{options}</Select>);
});

it('should forward extra attrs to underlying <select />', () => {
  const attrs = {
    title: 'Browser',
    multiple: true,
    required: true,
  };
  const { getByTitle } = render(<Select {...attrs}>{options}</Select>);
  const selectEl = getByTitle(attrs.title);

  expect(selectEl).toHaveAttribute('multiple', '');
  expect(selectEl).toHaveAttribute('required', '');
});
