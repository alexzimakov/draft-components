import { type Meta, type StoryFn } from '@storybook/react';
import { Breadcrumbs } from './breadcrumbs.js';
import { BreadcrumbsItem } from './breadcrumbs-item.js';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    children: {
      control: { disable: true },
    },
  },
};
export default meta;

export const Basic: StoryFn<typeof Breadcrumbs> = (args) => (
  <Breadcrumbs {...args}>
    <BreadcrumbsItem href="/" icon={<HomeIcon width={18} height={18} />}>
      Home
    </BreadcrumbsItem>
    <BreadcrumbsItem href="/navigation">
      Navigation
    </BreadcrumbsItem>
    <BreadcrumbsItem href="/navigation/breadcrumbs" aria-current="page">
      Breadcrumbs
    </BreadcrumbsItem>
  </Breadcrumbs>
);

export const CustomSeparator = Basic.bind({});
CustomSeparator.storyName = 'Custom separator';
CustomSeparator.argTypes = {
  separator: {
    control: { disable: true },
  },
};
CustomSeparator.args = {
  separator: <ChevronRightIcon height={16} />,
};
