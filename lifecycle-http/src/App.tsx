import React, { useState } from 'react';
import UsersClass from './UsersClass';
import UsersFunction from './UsersFunction';

function App() {
  const [showClass, setShowClass] = useState<boolean>(true);

  return (
    <div>
      <button onClick={() => setShowClass(!showClass)}>
        {showClass ? 'Показать функциональный' : 'Показать классовый'}
      </button>
      {showClass ? <UsersClass /> : <UsersFunction />}
    </div>
  );
}

export default App;