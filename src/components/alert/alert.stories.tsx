import { Meta, StoryFn } from '@storybook/react';
import { StorySection } from '../../storybook/story-section.js';
import { Alert } from './alert.js';
import { BoltIcon, CogIcon, HandThumbUpIcon, ScaleIcon, SignalSlashIcon } from '@heroicons/react/24/solid';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  args: {
    alertStyle: 'default',
    tint: 'gray',
  },
  argTypes: {
    title: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
};
export default meta;

export const Basic: StoryFn<typeof Alert> = (args) => (
  <Alert style={{ maxWidth: 720 }} {...args} />
);
Basic.args = {
  title: 'MIT License',
  children:
    'A short and simple permissive license with conditions only requiring'
    + 'preservation of copyright and license notices.',
};

export const WithIcon = Basic.bind({});
WithIcon.storyName = 'With icon';
WithIcon.args = {
  ...Basic.args,
  icon: <ScaleIcon width={18} height={18} />,
};

export const Dismissible = Basic.bind({});
Dismissible.args = {
  shouldShowDismissButton: true,
  tint: 'blue',
  icon: <CogIcon width={20} height={20} />,
  title: 'Update is available',
  children: 'The next version of app is available with new features and security improvements.',
};

export const Styles: StoryFn<typeof Alert> = (args) => (
  <section style={{ maxWidth: 720 }}>
    <StorySection title="default">
      <Alert {...args} alertStyle="default" />
    </StorySection>

    <StorySection title="full-width">
      <Alert {...args} alertStyle="full-width" />
    </StorySection>

    <StorySection title="accent-border">
      <Alert {...args} alertStyle="accent-left" />
    </StorySection>
  </section>
);
Styles.argTypes = {
  alertStyle: {
    table: { disable: true },
  },
};
Styles.args = {
  ...WithIcon.args,
};

export const Tints: StoryFn<typeof Alert> = (args) => (
  <section style={{ maxWidth: 720 }}>
    <StorySection title="Gray">
      <Alert
        {...args}
        tint="gray"
        icon={<ScaleIcon width={18} height={18} />}
        title="MIT License"
      >
        A short and simple permissive license with conditions only requiring
        preservation of copyright and license notices.
      </Alert>
    </StorySection>

    <StorySection title="Orange">
      <Alert
        {...args}
        icon={<BoltIcon width={18} height={18} />}
        tint="orange"
        title="Low Power Mode"
      >
        Automatic downloads and background app refresh are disabled
        in Low Power Mode.
      </Alert>
    </StorySection>

    <StorySection title="Red">
      <Alert
        {...args}
        icon={<SignalSlashIcon width={18} height={18} />}
        tint="red"
        title="You're currently offline"
      >
        Please check your internet connection and try again.
      </Alert>
    </StorySection>

    <StorySection title="Blue">
      <Alert
        {...args}
        icon={<CogIcon width={20} height={20} />}
        tint="blue"
        title="Update is available"
      >
        The next version of app is available with new features and security
        improvements.
      </Alert>
    </StorySection>

    <StorySection title="Green">
      <Alert
        {...args}
        icon={<HandThumbUpIcon width={18} height={18} />}
        tint="green"
        title="Update completed"
      >
        Your app was updated successfully. There are just a few more steps to
        follow, and then you're done!
      </Alert>
    </StorySection>
  </section>
);
Tints.parameters = {
  controls: {
    exclude: ['icon', 'title', 'children', 'tint'],
  },
};
