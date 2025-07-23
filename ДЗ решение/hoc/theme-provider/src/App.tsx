// src/App.tsx
import React, { useState } from 'react';
import { ThemeType } from './types';
import ThemedButton from './components/ThemedButton';
import { withTheme } from './hoc/withTheme';

const ThemedButtonWithTheme = withTheme(ThemedButton);

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeType>('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const appStyles: React.CSSProperties = {
    height: '100vh',
    padding: 20,
    backgroundColor: theme === 'light' ? '#fff' : '#222',
    color: theme === 'light' ? '#000' : '#fff',
    transition: 'background-color 0.3s, color 0.3s',
  };

  return (
    <div style={appStyles}>
      <button onClick={toggleTheme} style={{ marginBottom: 20 }}>
        Переключить тему (сейчас: {theme})
      </button>

      <ThemedButtonWithTheme theme={theme} onClick={() => alert('Clicked!')}>
        Кнопка с темой
      </ThemedButtonWithTheme>
    </div>
  );
};

export default App;
