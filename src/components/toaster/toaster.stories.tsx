import { type ToastParams, type ToastPosition, Toaster } from './toaster.js';
import { type ComponentProps } from 'react';
import { Button } from '../button/index.js';

export default {
  title: 'Feedback/Toaster',
  argTypes: {
    toastGap: {
      control: 'number',
    },
    toastPosition: {
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      control: {
        type: 'radio',
        labels: {
          'top-left': 'Top Left',
          'top-center': 'Top Center',
          'top-right': 'Top Right',
          'bottom-left': 'Bottom Left',
          'bottom-center': 'Bottom Center',
          'bottom-right': 'Bottom Right',
        },
      },
    },
    toastHideButtonLabel: {
      control: 'text',
    },
  },
};

const toaster = new Toaster();
const toasts: ToastParams[] = [
  {
    title: 'Document deleted.',
    actions: [{ content: 'Close' }],
  },
  {
    title: 'Get a Bluetooth speaker',
    icon: <BellAlertIcon width={20} height={20} />,
    actions: [{ content: 'Dismiss' }],
  },
  {
    title: 'Couldn\'t send photo.',
    icon: <ExclamationCircleIcon color="#f87171" width={20} height={20} />,
    actions: [{ content: 'Retry' }],
  },
  {
    title: 'You are currently offline.',
    icon: <WifiIcon color="#d1d5db" width={20} height={20} />,
    actions: [{ content: 'Refresh' }],
  },
  {
    title: 'Your internet connection was restored.',
    icon: <WifiIcon color="#22c55e" width={20} height={20} />,
  },
  {
    title: 'Your mail has been archived.',
    message: 'Archived mails are available in the "Archived" folder.',
    actions: [{ content: 'Got it' }, { content: 'Undo' }],
  },
];

let toastsCount = 0;
const getToast = () => toasts[toastsCount++ % toasts.length];

export const Basic = (options: {
  toastGap?: number;
  toastPosition?: ToastPosition;
}) => {
  const handleClick = () => {
    toaster.showToast(getToast());
  };

  return (
    <div>
      {toaster.render(options)}
      <Button onClick={handleClick}>Show toast</Button>
    </div>
  );
};
Basic.args = {
  toastGap: 12,
  toastPosition: 'top-right',
  toastHideButtonLabel: 'Close',
};

function BellAlertIcon(props: ComponentProps<'svg'>) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
    </svg>
  );
}

function ExclamationCircleIcon(props: ComponentProps<'svg'>) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
    </svg>
  );
}

function WifiIcon(props: ComponentProps<'svg'>) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
    </svg>
  );
}
