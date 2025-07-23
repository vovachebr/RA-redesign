import React from 'react';
import { ThemeType } from '../types';

interface ThemedButtonProps {
  theme: ThemeType;
  onClick?: () => void;
  children?: React.ReactNode;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ theme, onClick, children }) => {
  const styles: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: 16,
    cursor: 'pointer',
    border: 'none',
    borderRadius: 5,
    backgroundColor: theme === 'light' ? '#f0f0f0' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    transition: 'background-color 0.3s, color 0.3s',
  };

  return (
    <button style={styles} onClick={onClick}>
      {children}
    </button>
  );
};

export default ThemedButton;
