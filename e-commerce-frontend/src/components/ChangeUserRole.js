import React, { useState } from 'react';
import Role from '../common/role';
import summaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({ name, email, role, onClose, userId, callFunction }) => {
  const [open, setOpen] = useState(true); // Initialize the dialog as open
 const [userRole, setUserRole] = useState(role);

  const handleChange = (event) => {
      setUserRole(event.target.value)
      
  }

  const updateUserRole = async() => {
    const getUpdateUserRole = await fetch(summaryApi.updateUser.url, {
      method: summaryApi.updateUser.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole
      })
    })
    const updateRole = await getUpdateUserRole.json();
    
    if(updateRole.success) {
      toast.success(updateRole.message);
      onClose()
      callFunction()
    }
    if(updateRole.error) {
      toast.error(updateRole.message);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" >
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg w-96 p-4 z-10" style={{ backgroundColor: 'rgb(239, 224, 226)' }}>
        <div className="flex items-center justify-between" >
          <div className="flex flex-col items-start">
            <h4 className="mb-1 text-2xl font-bold" style={{color:'rgb(56, 45, 94)'}} >Change User Role</h4>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5 cursor-pointer"
            onClick={onClose}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
          <hr />
        <div className="mt-4">
          <div className="grid gap-6">
            <h6 className="text-lg text-blue-gray-700" style={{color:'rgb(56, 45, 94)'}}>Name: {name}</h6>
            <h6 className="text-lg text-blue-gray-700" style={{color:'rgb(56, 45, 94)'}}>Email: {email}</h6>
            <div>
            <h6 className="text-lg text-blue-gray-700" style={{color:'rgb(56, 45, 94)'}}>Role:</h6>
              <select
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userRole} onChange={handleChange}
              >
                 {
                        Object.values(Role).map(el => {
                            return(
                                <option value={el} key={el}>{el}</option>
                            )
                        })
                    }
              </select>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            onClick={updateUserRole}
            style={{backgroundColor:'rgb(56, 45, 94)'}}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;

