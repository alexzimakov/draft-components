import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Menu } from './menu';
import { MenuItem } from './menu-item';
import { MenuSeparator } from './menu-separator';
import {
  ArrowDownTrayIcon,
  DocumentDuplicateIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

export default {
  title: 'Menu',
  component: Menu,
  subcomponents: {
    MenuItem,
    MenuSeparator,
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Menu>;

export const Basic: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <MenuItem>Save</MenuItem>
    <MenuItem>Rename</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuSeparator />
    <MenuItem appearance="destructive">Delete</MenuItem>
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

export const WithIcon: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <MenuItem icon={<ArrowDownTrayIcon width={16} height={16} />}>
      Save
    </MenuItem>
    <MenuItem icon={<PencilIcon width={16} height={16} />}>
      Rename
    </MenuItem>
    <MenuItem icon={<DocumentDuplicateIcon width={16} height={16} />}>
      Rename
    </MenuItem>
    <MenuSeparator />
    <MenuItem
      icon={<TrashIcon width={16} height={16} />}
      appearance="destructive"
    >
      Delete
    </MenuItem>
  </Menu>
);
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
