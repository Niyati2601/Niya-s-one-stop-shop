import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Role from '../common/role'

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    if(user?.data?.role !== Role.ADMIN) {
        navigate('/')
    }
    return (
        <div>
            <div className='min-h-[calc(100vh-120px)] md:flex hidden'>

                <aside className='bg-white min-h-full  w-full  max-w-60 shadow-lg'>
                    <div className='h-32  flex justify-center items-center flex-col'>
                        <div className='text-5xl cursor-pointer relative flex justify-center'>
                        {user?.data?.image ? <img src={user.data.image} alt='user' className='w-10 h-10 rounded-full' /> : <FaUserCircle style={{ color: 'rgb(56, 45, 94)' }} />}
                        </div>
                        <p className='capitalize text-lg font-semibold'>{user?.data?.name}</p>
                        <p className='text-sm'>{user?.data?.role}</p>
                    </div>

                   { /* side bar navigation */}
                    <div>
                        <nav className='grid p-4'>
                            <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                            <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>All product</Link>
                        </nav>
                    </div>
                </aside>

                <main className='w-full h-full p-2'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminPanel