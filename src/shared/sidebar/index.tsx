import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

//icons
import { CgLogOff } from 'react-icons/cg';
import { BiNews } from 'react-icons/bi';
import { AiOutlineDollar } from 'react-icons/ai';
import { RiDashboardFill } from 'react-icons/ri';
import { FiUsers } from 'react-icons/fi';
import { IoCardOutline, IoCopyOutline } from 'react-icons/io5';
import { MdOutlineDashboardCustomize } from 'react-icons/md';

import logo from '../../assets/images/logo.png';
import { OpenLogoutModal } from '../../store/modal/logout-modal';

type Props = {
    sidebarMenus?: any[]
}

const Sidebar = ({sidebarMenus}: Props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { pathname } = location;

    const openModal = () => {
        dispatch(OpenLogoutModal());
    }

    
    

    return (
        <>
            <div className="bg-white dark:bg-gray-900 min-h-screen max-h-fit px-4 py-5">
                <div className="my-5 px-4">
                    <img src={logo} alt="logo" width="100px" height="100px" />
                </div>
                <ul className="list-none text-[#8c8c8c]">
                    <li className='my-6 py-3 px-4 text-center rounded-md hover:bg-[#134FE7] hover:text-white' title="Dashboard">
                        <Link to="/dashboard">
                            <div className='flex justify-start'>
                                <div><span><RiDashboardFill /></span></div>
                                <div className='mx-2'>Dashboard</div>
                            </div>   
                        </Link>
                    </li>
                    <li 
                        className={`${ pathname === '/jobs' && 'bg-[#134FE7] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#134FE7] hover:text-white` }
                        title="jobs/trainings"
                    >
                        <Link to="/jobs">
                            <div className='flex justify-start'>
                                <div><span><AiOutlineDollar className='text-xl'/></span></div>
                                <div className='mx-2'>Jobs & Trainings</div>
                            </div>           
                        </Link>
                    </li>
                    <li 
                        className={`${ pathname === '/users' && 'bg-[#134FE7] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#134FE7] hover:text-white` }
                        title="users"
                    >
                        <Link to="/users">
                            <div className='flex justify-start'>
                                <div><span><FiUsers className='text-xl'/></span></div>
                                <div className='mx-2'>Users</div>
                            </div>           
                        </Link>
                    </li>
                    <li 
                        className={`${ pathname === '/chats' && 'bg-[#134FE7] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#134FE7] hover:text-white` }
                        title="chats"
                    >
                        <Link to="/chats">
                            <div className='flex justify-start'>
                                <div><span><FiUsers className='text-xl'/></span></div>
                                <div className='mx-2'>Chats</div>
                            </div>           
                        </Link>
                    </li>
                    <li
                        className={`${ pathname === '/job-application' && 'bg-[#134FE7] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#134FE7] hover:text-white` }
                        title="job-application"
                    >
                        <Link to="/job-application">
                            <div className='flex justify-start'>
                                <div><span><IoCopyOutline className='text-xl'/></span></div>
                                <div className='mx-2'>Applications</div>
                            </div>           
                        </Link>
                    </li>
                    <li
                        className={`${ pathname === '/invoices' && 'bg-[#134FE7] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#134FE7] hover:text-white` }
                        title="invoices"
                    >
                        <Link to="/invoices">
                            <div className='flex justify-start'>
                                <div><span><IoCopyOutline className='text-xl'/></span></div>
                                <div className='mx-2'>Invoices</div>
                            </div>           
                        </Link>
                    </li>
                    
                    <li 
                        className={`${ pathname === '/newsletter' && 'bg-[#134FE7] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#134FE7] hover:text-white` }
                        title="Newsletter"
                    >
                        <Link to="/newsletter">
                            <div className='flex justify-start'>
                                <div><span><BiNews className='text-xl'/></span></div>
                                <div className='mx-2'>Newsletter</div>
                            </div>           
                        </Link>
                    </li>

                    <li 
                        className={`${ pathname === '/orders' && 'bg-[#134FE7] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#134FE7] hover:text-white` }
                        title="orders"
                    >
                        <Link to="/orders">
                            <div className='flex justify-start'>
                                <div><span><MdOutlineDashboardCustomize className='text-xl'/></span></div>
                                <div className='mx-2'>Orders</div>
                            </div>           
                        </Link>
                    </li>

                    <li 
                        className={`${ pathname === '/account' && 'bg-[#134FE7] text-white' } cursor-pointer my-6 py-3 px-4 text-center rounded-md hover:bg-[#134FE7] hover:text-white` }
                        title="account"
                        onClick={() => openModal()}
                    >
                        <div className='flex justify-start'>
                            <div><span><CgLogOff className='text-xl'/></span></div>
                            <div className='mx-2'>Log Out</div>
                        </div>           
                    </li>       
                    
                </ul>
            </div>
        </>
    )
}

export default Sidebar;