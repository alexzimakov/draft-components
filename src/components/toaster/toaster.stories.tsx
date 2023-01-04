import { Toaster, type ToastParams, type ToastPosition } from './toaster';
import { Button } from '../button';
import {
  BellAlertIcon,
  ExclamationCircleIcon,
  WifiIcon,
} from '@heroicons/react/24/outline';

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
    title: "Couldn't send photo.",
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
