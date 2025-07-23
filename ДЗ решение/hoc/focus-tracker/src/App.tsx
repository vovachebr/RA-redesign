import { useState } from 'react';
import { withFocusTracker } from './hoc/withFocusTracker';
import { Input } from './components/Input';

const InputWithFocusTracker = withFocusTracker(Input);

export default function App() {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  return (
    <>
      <InputWithFocusTracker
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocusChange={setFocused}
        onFocus={() => console.log('Focused')}
        onBlur={() => console.log('Blurred')}
      />
      <div>Focused: {focused ? 'Yes' : 'No'}</div>
    </>
  );
}