import { Meta } from '@storybook/react';
import { useState } from 'react';
import { Tabs } from './tabs';
import { TabList } from './tab-list';
import { Tab } from './tab';
import { TabPanel } from './tab-panel';
import ArchiveBoxIcon from '@heroicons/react/24/outline/ArchiveBoxIcon';
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon';
import InboxIcon from '@heroicons/react/24/outline/InboxIcon';
import PaperAirplaneIcon from '@heroicons/react/24/outline/PaperAirplaneIcon';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
};
export default meta;

export const Basic = () => {
  const tabs = {
    all: 'all',
    inProgress: 'inProgress',
    completed: 'completed',
    drafts: 'drafts',
  };
  const [selectedTab, setSelectedTab] = useState(tabs.all);
  return (
    <Tabs selectedTab={selectedTab} onSelectTab={setSelectedTab}>
      <TabList aria-label="Tasks">
        <Tab name={tabs.all}>All</Tab>
        <Tab name={tabs.inProgress}>In progress</Tab>
        <Tab name={tabs.completed}>Completed</Tab>
        <Tab name={tabs.drafts}>Drafts</Tab>
      </TabList>

      <TabPanel tab={tabs.all}>
        <p>All tab panel</p>
      </TabPanel>

      <TabPanel tab={tabs.inProgress}>
        <p>Ingress tab panel</p>
      </TabPanel>

      <TabPanel tab={tabs.completed}>
        <p>Completed tab panel</p>
      </TabPanel>

      <TabPanel tab={tabs.drafts}>
        <p>Drafts tab panel</p>
      </TabPanel>
    </Tabs>
  );
};

export const IconAndCounter = () => {
  const tabs = {
    inbox: 'inbox',
    drafts: 'drafts',
    sent: 'sent',
    archive: 'archive',
  };
  const [selectedKey, setSelectedKey] = useState(tabs.inbox);
  return (
    <Tabs selectedTab={selectedKey} onSelectTab={setSelectedKey}>
      <TabList aria-label="Mail">
        <Tab
          name={tabs.inbox}
          icon={<InboxIcon width={16} height={16} />}
        >
          Inbox
        </Tab>
        <Tab
          name={tabs.drafts}
          icon={<DocumentIcon width={16} height={16} />}
        >
          Drafts
        </Tab>
        <Tab
          name={tabs.sent}
          icon={<PaperAirplaneIcon width={16} height={16} />}
          counter={2}
        >
          Sent
        </Tab>
        <Tab
          name={tabs.archive}
          icon={<ArchiveBoxIcon width={16} height={16} />}
          counter={17}
        >
          Archive
        </Tab>
      </TabList>

      <TabPanel tab={tabs.inbox}>
        <p>Inbox tab panel</p>
      </TabPanel>

      <TabPanel tab={tabs.drafts}>
        <p>Drafts tab panel</p>
      </TabPanel>

      <TabPanel tab={tabs.sent}>
        <p>Sent tab panel</p>
      </TabPanel>

      <TabPanel tab={tabs.archive}>
        <p>Archive tab panel</p>
      </TabPanel>
    </Tabs>
  );
};
IconAndCounter.storyName = 'With icon and badge';
