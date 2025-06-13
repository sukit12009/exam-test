import React from 'react';
import { User } from '../../features/users/userSlice';
import UserForm from '../../features/users/UserForm';

interface UserFormModalProps {
  isOpen: boolean;
  editingUser: User | null;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (userData: { name: string; email: string; role: 'user' | 'admin' }) => void;
  onCancel: () => void;
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  editingUser,
  isLoading,
  onClose,
  onSubmit,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {editingUser ? 'Edit User' : 'Add New User'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <UserForm
          user={editingUser}
          onSubmit={onSubmit}
          onCancel={onCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default UserFormModal;
