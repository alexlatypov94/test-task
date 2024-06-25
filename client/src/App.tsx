import { AddClientForm, Table } from './components';
import './App.css';
import { useCallback, useEffect, useState } from 'react';
import Api from './services/api';
import { UserResponse } from './interfaces/UserInterface';
import { useDebounce } from './hooks/useDebaunce';

const App = () => {
  const [filteredValue, setFilteredValue] = useState('');
  const debouncedFilteredValue = useDebounce(filteredValue, 500);
  const [isFormOpen, setFormOpen] = useState(false);
  const [users, setUsers] = useState<UserResponse>({
    users: [],
    totalUsers: 0,
  });
  const [isLoading, setLoading] = useState(false);

  const fetchUsers = useCallback(
    async (page = 1) => {
      setLoading(true);
      const { data } = await Api.getUsers({
        page: page,
        limit: 10,
        name: debouncedFilteredValue,
      });
      setLoading(false);
      if (!!data) {
        setUsers(data);
      }
    },
    [debouncedFilteredValue]
  );

  useEffect(() => {
    fetchUsers();
  }, [debouncedFilteredValue, fetchUsers]);

  const handleRemoveUser = (idNumber: number) => {
    setUsers((prev) => ({
      ...prev,
      users: prev.users.filter((user) => user.idNumber !== idNumber) ?? [],
    }));
  };

  return (
    <div className="App">
      <h1>Users</h1>
      <div onClick={() => setFormOpen(!isFormOpen)} className="cursor-p">
        Add User {isFormOpen ? '↑' : '↓'}
      </div>
      {isFormOpen && (
        <AddClientForm handleCloseForm={() => setFormOpen(false)} />
      )}
      <div className="inputWrapper">
        <input
          type="text"
          value={filteredValue}
          placeholder="Search"
          onChange={(e) => setFilteredValue(e.target.value)}
        />
      </div>
      {isLoading || !users ? (
        <div>Loading...</div>
      ) : (
        <Table
          userData={users}
          onRemoveUser={handleRemoveUser}
          handleChangePage={fetchUsers}
        />
      )}
    </div>
  );
};

export default App;
