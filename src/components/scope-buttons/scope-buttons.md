```jsx
import { ScopeButtons } from './scope-buttons';

const options = ['All', 'Mobile', 'Desktop', 'Web'];
const [selectedOption, setSelectedOption] = React.useState(options[0]);

<ScopeButtons>
  {options.map((option) => (
    <ScopeButtons.Button
      key={option}
      isActive={selectedOption === option}
      onClick={() => setSelectedOption(option)}
    >
      {option}
    </ScopeButtons.Button>
  ))}
</ScopeButtons>;
```
