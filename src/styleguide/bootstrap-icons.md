[https://icons.getbootstrap.com](https://icons.getbootstrap.com)

```jsx padded
import { SvgIcon } from '../components/svg-icon';
import * as icons from '../bootstrap-icons';

const styles = {
  list: {
    display: 'grid',
    rowGap: 32,
    gridTemplateColumns: 'repeat(5, 1fr)',
    padding: 0,
    listStyle: 'none',
  },
  item: {
    textAlign: 'center',
  },
  name: {
    display: 'inline-block',
    paddingTop: 12,
    color: 'var(--dc-secondary-text-color)',
    fontSize: 12,
    fontFamily: 'var(--dc-font-code)',
  },
};

<ol style={styles.list}>
  {Object.entries(icons).map(([key, icon]) => (
    <li key={key} style={styles.item}>
      <SvgIcon size="xl" icon={icon} />
      <br />
      <code style={styles.name}>{key}</code>
    </li>
  ))}
</ol>;
```
