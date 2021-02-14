import { React, useState } from 'react';

import UserTable from './components/Tables/UserTable';
import AddUserForm from './components/AddUserForm/AddUserForm';
import EditUserForm from './components/EditUserForm/EditUserForm';
import './App.css';
function App() {
  const usersData = [
    { id: 1, name: 'Kevyn', username: 'juzztawind' },
    {
      id: 2,
      name: 'Mary',
      username: 'marycota',
    },
    {
      id: 3,
      name: 'Dino',
      username: 'dinossauro',
    },
  ];

  const [users, setUsers] = useState(usersData);
  const [editing, setEditing] = useState(false);
  const initialFormState = { id: null, name: '', username: '' };
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setEditing(false);

    setUsers(users.filter((user) => user.id !== id));
  };

  const editRow = (user) => {
    setEditing(true);

    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    console.log('Usuário atualizado: ', updatedUser);
    //passa pelos usuários buscando o id passado para dar match no usuario que queremos
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  return (
    <div className="container">
      <h1 className="title">CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large edit">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div>
          <h2>View users</h2>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
        </div>
      </div>
    </div>
  );
}

export default App;
