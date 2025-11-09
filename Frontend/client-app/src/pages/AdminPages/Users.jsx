import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios/axiosInstance';

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('students/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Users</h1>
        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          Add User
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">First Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Last Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{user.first_name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.last_name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors ${
                      user.status === 'block' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                    }`}
                    onClick={() => handleStatusChange(user.id, user.status)}
                  >
                    {user.status === 'block' ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
