// noinspection ES6PreferShortImport

import * as React from 'react';
import { ActionsGroup } from './actions-group';
import { render, screen } from '@testing-library/react';
import { SvgIcon } from '../svg-icon';
import { bookmark } from '../../icons/bookmark';
import { archive } from '../../icons/archive';
import { chat } from '../../icons/chat';

it('renders without errors', () => {
  render(
    <ActionsGroup>
      <ActionsGroup.Button
        title="Bookmark"
        icon={<SvgIcon icon={bookmark} />}
      />
      <ActionsGroup.Button title="Archive" icon={<SvgIcon icon={archive} />} />
      <ActionsGroup.Button title="Reply" icon={<SvgIcon icon={chat} />} />
    </ActionsGroup>
  );

  screen.getByTitle('Bookmark');
  screen.getByTitle('Archive');
  screen.getByTitle('Reply');
});
