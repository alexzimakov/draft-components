import { type Meta, type StoryFn } from '@storybook/react';
import { type ComponentProps } from 'react';
import { Toast } from './toast.js';
import { ToastButton } from './toast-button.js';

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
  children: 'Can\'t add song to your library',
  actions: <ToastButton>Retry</ToastButton>,
};

export const WithMessage = Basic.bind({});
WithMessage.args = {
  children: 'Photo deleted',
  message:
    'Deleted photos are available in the "Recently Deleted" folder '
    + 'for 30 days.',
  actions: <ToastButton>Undo</ToastButton>,
};

export const WithIcon = Basic.bind({});
WithIcon.args = {
  children: 'Focus is on',
  message: 'All notifications and alerts will be silent.',
  icon: <MoonIcon fill="#fb7185" width={20} height={20} />,
  actions: <ToastButton>Turn off</ToastButton>,
};

function MoonIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="currentColor"
      {...props}
    >
      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
    </svg>
  );
}
