import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { EmptyState } from './empty-state';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import { Button } from '../button';

export default {
  title: 'Feedback/EmptyState',
  component: EmptyState,
} as ComponentMeta<typeof EmptyState>;

export const Basic: ComponentStory<typeof EmptyState> = (args) => (
  <EmptyState {...args} />
);
Basic.argTypes = {
  image: {
    control: { disable: true },
  },
  primaryAction: {
    control: { disable: true },
  },
  secondaryAction: {
    control: { disable: true },
  },
};
Basic.args = {
  image: (
    <DocumentPlusIcon
      stroke="#3b82f6"
      width={44}
      height={44}
      strokeWidth={1}
    />
  ),
  heading: 'Create your first document',
  description:
    'Get started with one of the built-in templates or ' +
    'create an empty document.',
  primaryAction: (
    <Button appearance="primary">
      Create a new document
    </Button>
  ),
  secondaryAction: (
    <Button appearance="primary" variant="plain">
      Choose a Template
    </Button>
  ),
};