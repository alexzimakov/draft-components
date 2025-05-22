import { type Meta, type StoryFn } from '@storybook/react';
import { type ComponentProps } from 'react';
import { EmptyState } from './empty-state.js';
import { Button } from '../button/index.js';

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
};
export default meta;

export const Basic: StoryFn<typeof EmptyState> = (args) => (
  <EmptyState {...args} />
);
Basic.args = {
  image: (
    <DocumentPlusIcon
      stroke="#3b82f6"
      width={44}
      height={44}
      strokeWidth={1}
    />
  ),
  title: 'Create your first document',
  message:
    'Get started with one of the built-in templates or '
    + 'create an empty document.',
  primaryAction: (
    <Button tint="blue">
      Create a new document
    </Button>
  ),
  secondaryAction: (
    <Button tint="blue" buttonStyle="plain">
      Choose a Template
    </Button>
  ),
};

function DocumentPlusIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
}
