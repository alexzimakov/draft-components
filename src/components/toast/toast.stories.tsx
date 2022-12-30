import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Toast } from './toast';
import { ToastButton } from './toast-button';
import { MoonIcon } from '@heroicons/react/24/solid';

export default {
  title: 'Feedback/Toast',
  component: Toast,
  subcomponents: {
    ToastButton,
  },
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
} as ComponentMeta<typeof Toast>;

export const Basic: ComponentStory<typeof Toast> = (args) => (
  <Toast {...args} />
);
Basic.args = {
  children: "Can't add song to your library",
  actions: <ToastButton>Retry</ToastButton>,
};

export const WithMessage = Basic.bind({});
WithMessage.args = {
  children: 'Photo deleted',
  message:
    'Deleted photos are available in the "Recently Deleted" folder ' +
    'for 30 days.',
  actions: <ToastButton>Undo</ToastButton>,
};

export const WithIcon = Basic.bind({});
WithIcon.args = {
  children: 'Focus is on',
  message: 'All notifications and alerts will be silent.',
  icon: <MoonIcon fill="#fb7185" width={20} height={20} />,
  actions: <ToastButton>Turn off</ToastButton>,
};
