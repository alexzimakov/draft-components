import { type Meta, type StoryFn } from '@storybook/react';
import { type ComponentProps } from 'react';
import { Breadcrumbs } from './breadcrumbs.js';
import { BreadcrumbsItem } from './breadcrumbs-item.js';

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
CustomSeparator.argTypes = {
  separator: {
    control: { disable: true },
  },
};
CustomSeparator.args = {
  separator: <ChevronRightIcon height={16} />,
};

function ChevronRightIcon(props: ComponentProps<'svg'>) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
}

function HomeIcon(props: ComponentProps<'svg'>) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}
