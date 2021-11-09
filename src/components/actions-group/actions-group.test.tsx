import { ActionsGroup } from './actions-group';
import { render, screen } from '@testing-library/react';
import { SvgIcon } from '../svg-icon';
import { bookmark } from '../../bootstrap-icons/bookmark';
import { archive } from '../../bootstrap-icons/archive';
import { chat } from '../../bootstrap-icons/chat';

it('renders without errors', () => {
  render(
    <ActionsGroup>
      <ActionsGroup.Button
        title="Bookmark"
        icon={<SvgIcon icon={bookmark} />}
      />
      <ActionsGroup.Button title="Archive" icon={<SvgIcon icon={archive} />} />
      <ActionsGroup.Button title="Reply" icon={<SvgIcon icon={chat} />} />
    </ActionsGroup>,
  );

  screen.getByTitle('Bookmark');
  screen.getByTitle('Archive');
  screen.getByTitle('Reply');
});
