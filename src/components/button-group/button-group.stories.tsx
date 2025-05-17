import { type Meta, type StoryFn } from '@storybook/react';
import { ButtonGroup } from './button-group.js';
import { IconButton } from '../button/index.js';

const meta: Meta<typeof ButtonGroup> = {
  title: 'ButtonGroup',
  component: ButtonGroup,
};
export default meta;

const minusIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1.15em"
    height="1.15em"
    fill="none"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 12h-15"
    />
  </svg>
);

const plusIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1.15em"
    height="1.15em"
    fill="none"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);

export const Basic: StoryFn<typeof ButtonGroup> = (args) => (
  <ButtonGroup {...args}>
    <IconButton>{minusIcon}</IconButton>
    <IconButton>{plusIcon}</IconButton>
  </ButtonGroup>
);
