import { Meta, StoryFn } from '@storybook/react';
import { EmptyState } from './empty-state.js';
import { Button } from '../button/index.js';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';

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
    'Get started with one of the built-in templates or ' +
    'create an empty document.',
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
