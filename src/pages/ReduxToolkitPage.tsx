import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  selectUsers,
  selectCurrentUser,
  selectLoading,
  selectError,
  setCurrentUser,
  addUser,
  updateUser,
  deleteUser,
} from '../features/users/userSlice';
import UserManagementHeader from '../components/user/UserManagementHeader';
import UserManagementContent from '../components/user/UserManagementContent';
import UserFormModal from '../components/user/UserFormModal';

const ReduxToolkitPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector(selectUsers);
  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<typeof currentUser>(null);

  // Set the first user as current user on initial load
  useEffect(() => {
    if (users.length > 0 && !currentUser) {
      dispatch(setCurrentUser(users[0]));
    }
  }, [users, currentUser, dispatch]);

  const handleAddUser = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user: typeof currentUser) => {
    if (user) {
      setEditingUser(user);
      setIsFormOpen(true);
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };

  const handleStatusChange = (userId: string, status: 'active' | 'inactive' | 'suspended') => {
    dispatch(updateUser({ id: userId, status }));
  };

  const handleSubmit = (userData: { name: string; email: string; role: 'user' | 'admin' }) => {
    if (editingUser) {
      dispatch(updateUser({ id: editingUser.id, ...userData }));
    } else {
      dispatch(addUser(userData));
    }
    setIsFormOpen(false);
  };

  const handleCloseModal = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <UserManagementHeader onAddUser={handleAddUser} />
      
      <UserManagementContent
        isLoading={isLoading}
        error={error}
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onStatusChange={handleStatusChange}
      />

      <UserFormModal
        isOpen={isFormOpen}
        editingUser={editingUser}
        isLoading={isLoading}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        onCancel={handleCloseModal}
      />
    </div>
  );
};

export default ReduxToolkitPage;
