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
            <div className="bg-white min-h-screen max-h-fit px-4 py-5">
                <div className="my-5 px-4">
                    <img src={logo} alt="logo" width="100px" height="100px" />
                </div>
                <ul className="list-none text-[#8c8c8c]">
                    <li className='my-6 py-3 px-4 text-center rounded-md hover:bg-[#8652A4] hover:text-white' title="Dashboard">
                        <Link to="/dashboard">
                            <div className='flex justify-start'>
                                <div><span><RiDashboardFill /></span></div>
                                <div className='mx-2'>Dashboard</div>
                            </div>   
                        </Link>
                    </li>
                    <li 
                        className={`${ pathname === '/cryptos' && 'bg-[#8652A4] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#8652A4] hover:text-white` }
                        title="cryptos"
                    >
                        <Link to="/cryptos">
                            <div className='flex justify-start'>
                                <div><span><AiOutlineDollar className='text-xl'/></span></div>
                                <div className='mx-2'>Cryptos</div>
                            </div>           
                        </Link>
                    </li>
                    <li 
                        className={`${ pathname === '/users' && 'bg-[#8652A4] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#8652A4] hover:text-white` }
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
                        className={`${ pathname === '/airtime' && 'bg-[#8652A4] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#8652A4] hover:text-white` }
                        title="airtime"
                    >
                        <Link to="/airtime">
                            <div className='flex justify-start'>
                                <div><span><IoCopyOutline className='text-xl'/></span></div>
                                <div className='mx-2'>Airtime</div>
                            </div>           
                        </Link>
                    </li>
                    <li 
                        className={`${ pathname === '/giftcards' && 'bg-[#8652A4] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#8652A4] hover:text-white` }
                        title="giftcards"
                    >
                        <Link to="/giftcards">
                            <div className='flex justify-start'>
                                <div><span><IoCardOutline className='text-xl'/></span></div>
                                <div className='mx-2'>Giftcards</div>
                            </div>           
                        </Link>
                    </li>

                    <li 
                        className={`${ pathname === '/newsletter' && 'bg-[#8652A4] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#8652A4] hover:text-white` }
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
                        className={`${ pathname === '/orders' && 'bg-[#8652A4] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#8652A4] hover:text-white` }
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
                        className={`${ pathname === '/account' && 'bg-[#8652A4] text-white' } cursor-pointer my-6 py-3 px-4 text-center rounded-md hover:bg-[#8652A4] hover:text-white` }
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