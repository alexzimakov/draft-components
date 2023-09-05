import { Meta, StoryFn } from '@storybook/react';
import { Menu } from './menu';
import { MenuItem } from './menu-item';
import { MenuSeparator } from './menu-separator';
import ArrowDownTrayIcon from '@heroicons/react/24/outline/ArrowDownTrayIcon';
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';
import PencilIcon from '@heroicons/react/24/outline/PencilIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Basic: StoryFn<typeof Menu> = (args) => (
  <Menu {...args}>
    <MenuItem>Save</MenuItem>
    <MenuItem>Rename</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuSeparator />
    <MenuItem destructive={true}>Delete</MenuItem>
  </Menu>
);
Basic.argTypes = {
  button: {
    control: 'text',
  },
  children: {
    control: { disable: true },
  },
};
Basic.args = {
  button: 'Open menu',
};

export const WithIcon: StoryFn<typeof Menu> = (args) => (
  <Menu {...args}>
    <MenuItem iconLeft={<ArrowDownTrayIcon width={16} height={16} />}>
      Save
    </MenuItem>
    <MenuItem iconLeft={<PencilIcon width={16} height={16} />}>
      Rename
    </MenuItem>
    <MenuItem iconLeft={<DocumentDuplicateIcon width={16} height={16} />}>
      Rename
    </MenuItem>
    <MenuSeparator />
    <MenuItem iconLeft={<TrashIcon width={16} height={16} />} destructive={true}>
      Delete
    </MenuItem>
  </Menu>
);
WithIcon.storyName = 'With icon';
WithIcon.argTypes = {
  button: {
    control: 'text',
  },
  children: {
    control: { disable: true },
  },
};
WithIcon.args = {
  button: 'Open menu',
};
