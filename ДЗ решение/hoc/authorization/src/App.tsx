import React from 'react';
import AdminPanel from './components/AdminPanel';
import withAuthorization from './hoc/withAuthorization';
import type { CurrentUser } from './types';

const AdminPanelWithAuth = withAuthorization(AdminPanel, ['admin']);

const currentUserExample: CurrentUser = {
  roles: ['user'], // смените на ['admin'] чтобы увидеть доступ
};

const App: React.FC = () => {
  return (
    <div>
      <AdminPanelWithAuth currentUser={currentUserExample} />
    </div>
  );
};

export default App;