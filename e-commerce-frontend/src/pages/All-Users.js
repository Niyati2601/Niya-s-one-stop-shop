import React, { useEffect, useState } from 'react'
import summaryApi from '../common'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import ChangeUserRole from '../components/ChangeUserRole';
import { toast } from 'react-toastify';

const AllUsers = () => {
    const [allUser, setAllUser] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updatedUserData, setUpdatedUserData] = useState({
        name: "",
        email: "",
        role: "",
        _id: ""
    })

    const getAllUser = async () => {
        const res = await fetch(summaryApi.allUser.url, {
            method: summaryApi.allUser.method,
            credentials: 'include',
        })
        const data = await res.json()

        setAllUser(data)
    }

    useEffect(() => {
        getAllUser()
    }, [])

    const handleDeleteUser = async (userId) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (!confirmed) return;
    
        try {
          const res = await fetch(summaryApi.deleteUser.url, {
            method: summaryApi.deleteUser.method,
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: userId})
          });
    
          const responseData = await res.json();
          if (responseData.success) {
            toast.success(responseData.message);
            setAllUser(allUser.filter(user => user.id !== userId));
          } else {
            toast.error(responseData.message);
          }
        } catch (error) {
        //   toast.error('An error occurred while deleting the product.');
        }
      };

        return (
            <div className="p-8 bg-white rounded-lg shadow-md" style={{ backgroundColor: 'rgb(239, 224, 226)' }}>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">Users</h2>
                        <p className="text-gray-600">A list of all the users in your account including their name, title, email and role.</p>
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700" style={{ backgroundColor: 'rgb(56, 45, 94)' }}>Add user</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white" style={{ backgroundColor: 'rgb(239, 224, 226)' }}>
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-200 text-center text-sm font-semibold text-gray-900" style={{ borderBottom: '1px solid rgb(56, 45, 94)', color: 'rgb(56, 45, 94)' }} >Sr No.</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-center text-sm font-semibold text-gray-900" style={{ borderBottom: '1px solid rgb(56, 45, 94)', color: 'rgb(56, 45, 94)' }} >Name</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-center text-sm font-semibold text-gray-900" style={{ borderBottom: '1px solid rgb(56, 45, 94)', color: 'rgb(56, 45, 94)' }}>Email</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-center text-sm font-semibold text-gray-900" style={{ borderBottom: '1px solid rgb(56, 45, 94)', color: 'rgb(56, 45, 94)' }}>Phone</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-center text-sm font-semibold text-gray-900" style={{ borderBottom: '1px solid rgb(56, 45, 94)', color: 'rgb(56, 45, 94)' }}>Role</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-center text-sm font-semibold text-gray-900" style={{ borderBottom: '1px solid rgb(56, 45, 94)', color: 'rgb(56, 45, 94)' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUser?.data?.map((user, index) => (
                                
                                <tr key={index} >
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-900 text-center" style={{ borderBottom: '1px solid rgb(56, 45, 94)', color: 'rgb(56, 45, 94)' }}>{index + 1}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-900 text-center" style={{ borderBottom: '1px solid rgb(56, 45, 94)', color: 'rgb(56, 45, 94)' }}>{user.name}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-900 text-center" style={{ borderBottom: '1px solid rgb(56, 45, 94)', color: 'rgb(56, 45, 94)' }}>{user.email}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-900 text-center" style={{ borderBottom: '1px solid rgb(56, 45, 94)', color: 'rgb(56, 45, 94)' }}>{user.phone}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-900 text-center" style={{ borderBottom: '1px solid rgb(56, 45, 94)', color: 'rgb(56, 45, 94)' }}>{user.role}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-blue-600 hover:text-blue-800 cursor-pointer text-center" style={{ borderBottom: '1px solid rgb(56, 45, 94)', color: 'rgb(56, 45, 94)' }}>
                                        <button className='rounded-full p-2' style={{ backgroundColor: 'rgb(56, 45, 94)', color: 'rgb(239, 224, 226)' }} onClick={() => {
                                            setUpdatedUserData(user)
                                            setOpenUpdateRole(true)
                                        }}><AiFillEdit /></button>
                                        <button className='rounded-full p-2 mx-auto' style={{ backgroundColor: 'rgb(56, 45, 94)', color: 'rgb(239, 224, 226)' }} onClick={()=> {handleDeleteUser(user._id)}}><AiFillDelete /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {openUpdateRole && (

                        <ChangeUserRole
                            onClose={() =>
                                setOpenUpdateRole(false)}
                            name={updatedUserData.name}
                            email={updatedUserData.email}
                            role={updatedUserData.role}
                            userId={updatedUserData._id}
                            callFunction={getAllUser}

                        />
                    )}
                </div>
            </div>
        )
    }

    export default AllUsers