import { type Meta } from '@storybook/react';
import { type ComponentProps, useState } from 'react';
import { Tabs } from './tabs.js';
import { TabList } from './tab-list.js';
import { Tab } from './tab.js';
import { TabPanel } from './tab-panel.js';

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

export const WithIconAndBadge = () => {
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

function ArchiveBoxIcon(props: ComponentProps<'svg'>) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
  );
}

function DocumentIcon(props: ComponentProps<'svg'>) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
}

function InboxIcon(props: ComponentProps<'svg'>) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
    </svg>
  );
}

function PaperAirplaneIcon(props: ComponentProps<'svg'>) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
  );
}
