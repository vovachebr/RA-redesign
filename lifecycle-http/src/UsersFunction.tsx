import React, { useState, useEffect } from 'react';

interface IUser {
  id: number;
  name: string;
}

function UsersFunction() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log('useEffect (componentDidMount)');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) throw new Error('Ошибка сети');
        return res.json();
      })
      .then(
        (data: IUser[]) => { setUsers(data); setLoading(false); },
        (error: Error) => { setError(error); setLoading(false); }
      );

    return () => {
      console.log('useEffect cleanup (componentWillUnmount)');
    };
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

export default UsersFunction;