import React from 'react';
import { User } from '../../features/users/userSlice';
import UserList from '../../features/users/UserList';

interface UserManagementContentProps {
  isLoading: boolean;
  error: string | null;
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onStatusChange: (userId: string, status: 'active' | 'inactive' | 'suspended') => void;
}

const UserManagementContent: React.FC<UserManagementContentProps> = ({
  isLoading,
  error,
  users,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 shadow overflow-hidden sm:rounded-lg">
      <UserList
        users={users}
        onEdit={onEdit}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
      />
    </div>
  );
};

export default UserManagementContent;
