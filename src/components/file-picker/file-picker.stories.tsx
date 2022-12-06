import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { useState, type ComponentPropsWithoutRef } from 'react';
import { FilePicker } from './file-picker';

export default {
  title: 'Forms/FilePicker',
  component: FilePicker,
  argTypes: {
    icon: {
      disable: true,
    },
  },
} as ComponentMeta<typeof FilePicker>;

export const Basic: ComponentStory<typeof FilePicker> = (args) => {
  const [files, setFiles] = useState<File[]>([]);

  let label = args.label;
  if (files.length === 1) {
    label = files[0].name;
  } else if (files.length > 1) {
    label = `${files.length} files`;
  }

  let icon = <PhotoIcon width={28} height={28} />;
  if (files.length > 0) {
    icon = <img
      style={{ objectFit: 'contain' }}
      src={URL.createObjectURL(files[0])}
      height={32}
      alt=""
    />;
  }

  return (
    <FilePicker
      {...args}
      icon={icon}
      label={label}
      accept="image/*"
      multiple={true}
      onSelectFiles={setFiles}
    />
  );
};
Basic.args = {
  label: 'Upload a profile photo',
  caption: 'PNG, JPG or GIF (min size 320 × 320px)',
};

export const Disabled = Basic.bind({});
Disabled.args = {
  disabled: true,
  label: 'Upload a profile photo',
  caption: 'PNG, JPG or GIF (min size 320 × 320px)',
};

function PhotoIcon(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  );
}
