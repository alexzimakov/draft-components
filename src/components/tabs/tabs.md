```jsx
import { useState } from 'react';
import { Tabs } from '../tabs';

const TabKeys = {
  NILS: 'nils',
  AGNES: 'agnes',
  JOKE: 'joke',
};
const [selectedTabKey, setSelectedTabKey] = useState(TabKeys.NILS);

<Tabs selectedTabKey={selectedTabKey} onSelectTab={setSelectedTabKey}>
  <Tabs.List>
    <Tabs.Tab tabKey={TabKeys.NILS}>Nils Frahm</Tabs.Tab>
    <Tabs.Tab tabKey={TabKeys.AGNES}>Agnes Obel</Tabs.Tab>
    <Tabs.Tab tabKey={TabKeys.JOKE}>Joke</Tabs.Tab>
  </Tabs.List>

  <Tabs.Panel associatedTabKey={TabKeys.NILS}>
    <p>
      Nils Frahm is a German musician, composer and record producer based in Berlin. He is known for combining classical
      and electronic music and for an unconventional approach to the piano in which he mixes a grand piano, upright
      piano, Roland Juno-60, Rhodes piano, drum machine, and Moog Taurus.
    </p>
  </Tabs.Panel>

  <Tabs.Panel associatedTabKey={TabKeys.AGNES}>
    <p>
      Agnes Caroline Thaarup Obel is a Danish singer/songwriter. Her first album, Philharmonics, was released by PIAS
      Recordings on 4 October 2010 in Europe. Philharmonics was certified gold in June 2011 by the Belgian Entertainment
      Association (BEA) for sales of 10,000 Copies.
    </p>
  </Tabs.Panel>

  <Tabs.Panel associatedTabKey={TabKeys.JOKE}>
    <p>Fear of complicated buildings:</p>
    <p>A complex complex complex.</p>
  </Tabs.Panel>
</Tabs>;
```

With icons

```jsx
import { useState } from 'react';
import { Tabs } from '../tabs';
import { SvgIcon } from '../svg-icon';
import { musicNoteBeamed } from '../../bootstrap-icons/music-note-beamed';
import { hammer } from '../../bootstrap-icons/hammer';
import { joystick } from '../../bootstrap-icons/joystick';

const TabKeys = {
  ENTERTAINMENT: 'entertainment',
  DEVELOP: 'develop',
  GAMES: 'games',
};
const [selectedTabKey, setSelectedTabKey] = useState(TabKeys.ENTERTAINMENT);

<Tabs selectedTabKey={selectedTabKey} onSelectTab={setSelectedTabKey}>
  <Tabs.List>
    <Tabs.Tab tabKey={TabKeys.ENTERTAINMENT} icon={<SvgIcon icon={musicNoteBeamed} />}>
      Entertainment
    </Tabs.Tab>
    <Tabs.Tab tabKey={TabKeys.DEVELOP} icon={<SvgIcon icon={hammer} />}>
      Develop
    </Tabs.Tab>
    <Tabs.Tab tabKey={TabKeys.GAMES} icon={<SvgIcon icon={joystick} />}>
      Games
    </Tabs.Tab>
  </Tabs.List>

  <Tabs.Panel associatedTabKey={TabKeys.ENTERTAINMENT}>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem doloremque eveniet ex excepturi fugit id iusto
      molestias odit? Aperiam at consequatur debitis eos facilis id odio quidem repellat ullam velit.
    </p>
  </Tabs.Panel>

  <Tabs.Panel associatedTabKey={TabKeys.DEVELOP}>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam asperiores consequatur cumque cupiditate
      deleniti, dolore doloremque doloribus eius facilis id iusto laboriosam magnam, maxime modi mollitia nihil sunt
      tenetur veritatis!
    </p>
  </Tabs.Panel>

  <Tabs.Panel associatedTabKey={TabKeys.GAMES}>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem consectetur consequuntur ducimus
      eaque earum eius enim illo iusto odit officia perferendis provident qui recusandae sed, sint sunt temporibus
      voluptatibus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa cum ducimus libero mollitia officia pariatur
      quibusdam ratione, rem repellat repellendus soluta velit voluptas voluptatibus? A assumenda autem dolor mollitia
      vitae!
    </p>
  </Tabs.Panel>
</Tabs>;
```

With badges

```jsx
import { useState } from 'react';
import { Tabs } from '../tabs';

const TabKeys = {
  ENTERTAINMENT: 'entertainment',
  DEVELOP: 'develop',
  GAMES: 'games',
};
const [selectedTabKey, setSelectedTabKey] = useState(TabKeys.ENTERTAINMENT);

<Tabs selectedTabKey={selectedTabKey} onSelectTab={setSelectedTabKey}>
  <Tabs.List>
    <Tabs.Tab tabKey={TabKeys.ENTERTAINMENT} badge={3}>Entertainment</Tabs.Tab>
    <Tabs.Tab tabKey={TabKeys.DEVELOP} badge={17}>Develop</Tabs.Tab>
    <Tabs.Tab tabKey={TabKeys.GAMES}>Games</Tabs.Tab>
  </Tabs.List>

  <Tabs.Panel associatedTabKey={TabKeys.ENTERTAINMENT}>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem doloremque eveniet ex excepturi fugit id iusto
      molestias odit? Aperiam at consequatur debitis eos facilis id odio quidem repellat ullam velit.
    </p>
  </Tabs.Panel>

  <Tabs.Panel associatedTabKey={TabKeys.DEVELOP}>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam asperiores consequatur cumque cupiditate
      deleniti, dolore doloremque doloribus eius facilis id iusto laboriosam magnam, maxime modi mollitia nihil sunt
      tenetur veritatis!
    </p>
  </Tabs.Panel>

  <Tabs.Panel associatedTabKey={TabKeys.GAMES}>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem consectetur consequuntur ducimus
      eaque earum eius enim illo iusto odit officia perferendis provident qui recusandae sed, sint sunt temporibus
      voluptatibus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa cum ducimus libero mollitia officia pariatur
      quibusdam ratione, rem repellat repellendus soluta velit voluptas voluptatibus? A assumenda autem dolor mollitia
      vitae!
    </p>
  </Tabs.Panel>
</Tabs>;
```
