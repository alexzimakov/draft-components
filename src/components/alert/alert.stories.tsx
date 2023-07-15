import { Meta, StoryFn } from '@storybook/react';
import { StorySection } from '../../storybook/story-section';
import { Alert } from './alert';
import { BoltIcon, CogIcon, HandThumbUpIcon, ScaleIcon, SignalSlashIcon } from '@heroicons/react/24/solid';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  argTypes: {
    icon: {
      control: { disable: true },
    },
    heading: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
};
export default meta;

const LAYOUT_MAX_WIDTH = '720px';

export const Basic: StoryFn<typeof Alert> = (args) => (
  <Alert style={{ maxWidth: LAYOUT_MAX_WIDTH }} {...args} />
);
Basic.argTypes = {
  children: {
    control: { disable: true },
  },
};
Basic.args = {
  heading: 'MIT License',
  children:
    'A short and simple permissive license with conditions only requiring' +
    'preservation of copyright and license notices.',
};

export const WithIcon = Basic.bind({});
WithIcon.argTypes = {
  ...Basic.argTypes,
};
WithIcon.args = {
  ...Basic.args,
  icon: <ScaleIcon width={18} height={18} />,
};

export const Variant: StoryFn<typeof Alert> = (args) => (
  <section style={{ maxWidth: LAYOUT_MAX_WIDTH }}>
    <StorySection heading="default">
      <Alert {...args} variant="default" />
    </StorySection>

    <StorySection heading="full-width">
      <Alert {...args} variant="full-width" />
    </StorySection>

    <StorySection heading="accent-border">
      <Alert {...args} variant="accent-border" />
    </StorySection>
  </section>
);
Variant.argTypes = {
  variant: {
    control: { disable: true },
  },
};
Variant.args = {
  ...WithIcon.args,
};

export const Appearance: StoryFn<typeof Alert> = (args) => (
  <section style={{ maxWidth: LAYOUT_MAX_WIDTH }}>
    <StorySection heading="default">
      <Alert
        {...args}
        icon={<ScaleIcon width={18} height={18} />}
        heading="MIT License"
        appearance="default"
      >
        A short and simple permissive license with conditions only requiring
        preservation of copyright and license notices.
      </Alert>
    </StorySection>

    <StorySection heading="warning">
      <Alert
        {...args}
        icon={<BoltIcon width={18} height={18} />}
        heading="Low Power Mode"
        appearance="warning"
      >
        Automatic downloads and background app refresh are disabled
        in Low Power Mode.
      </Alert>
    </StorySection>

    <StorySection heading="error">
      <Alert
        {...args}
        icon={<SignalSlashIcon width={18} height={18} />}
        heading="You're currently offline"
        appearance="error"
      >
        Please check your internet connection and try again.
      </Alert>
    </StorySection>

    <StorySection heading="info">
      <Alert
        {...args}
        icon={<CogIcon width={20} height={20} />}
        heading="Update is available"
        appearance="info"
      >
        The next version of app is available with new features and security
        improvements.
      </Alert>
    </StorySection>

    <StorySection heading="success">
      <Alert
        {...args}
        icon={<HandThumbUpIcon width={18} height={18} />}
        heading="Update completed"
        appearance="success"
      >
        Your app was updated successfully. There are just a few more steps to
        follow, and then you're done!
      </Alert>
    </StorySection>
  </section>
);
Appearance.argTypes = {
  icon: {
    control: { disable: true },
  },
  heading: {
    control: { disable: true },
  },
  appearance: {
    control: { disable: true },
  },
};
Appearance.args = {
  variant: 'default',
};
