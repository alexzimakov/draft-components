import { Meta, StoryFn } from '@storybook/react';
import { Toast } from './toast.js';
import { ToastButton } from './toast-button.js';
import { MoonIcon } from '@heroicons/react/24/solid';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  argTypes: {
    children: {
      control: 'text',
    },
    message: {
      control: 'text',
    },
    icon: {
      control: { disable: true },
    },
    actions: {
      control: { disable: true },
    },
  },
};
export default meta;

export const Basic: StoryFn<typeof Toast> = (args) => (
  <Toast {...args} />
);
Basic.args = {
  children: "Can't add song to your library",
  actions: <ToastButton>Retry</ToastButton>,
};

export const WithMessage = Basic.bind({});
WithMessage.storyName = 'With message';
WithMessage.args = {
  children: 'Photo deleted',
  message:
    'Deleted photos are available in the "Recently Deleted" folder ' +
    'for 30 days.',
  actions: <ToastButton>Undo</ToastButton>,
};

export const WithIcon = Basic.bind({});
WithIcon.storyName = 'With icon';
WithIcon.args = {
  children: 'Focus is on',
  message: 'All notifications and alerts will be silent.',
  icon: <MoonIcon fill="#fb7185" width={20} height={20} />,
  actions: <ToastButton>Turn off</ToastButton>,
};
