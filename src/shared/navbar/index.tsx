import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

//  icons
import{CiSearch} from 'react-icons/ci';
import { BiNews } from 'react-icons/bi';
import {CiBellOn} from 'react-icons/ci';
import { FiMenu } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';
import { CgLogOff } from 'react-icons/cg';
import { AiOutlineDollar } from 'react-icons/ai';
import { RiDashboardFill } from 'react-icons/ri';
import { FiUsers } from 'react-icons/fi';
import { IoCardOutline, IoCopyOutline } from 'react-icons/io5';
import { MdOutlineDashboardCustomize } from 'react-icons/md';


// styles
import './style.css';
// logo
import defaultProfileImg from '../../assets/images/arash.png';
import { User } from "../../models";
import AppLoader from "../../components/app-loader";
import { OpenLogoutModal } from "../../store/modal/logout-modal";

type Props = {
    profile: User | null;
    loading: boolean;
}


const Navbar = ({ profile, loading}: Props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { pathname } = location;
    const[ toggle, setToggle] = useState<boolean>(true);
    const [headPadding, setHeadPadding] = useState<string>('pt-0');
    const [showSideBar, setShowSidebar] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    const openSidebar = () => {
        setShowSidebar(true);
        console.log(showSideBar);
    }
    const closeSidebar = () => setShowSidebar(false);

    const customeStyle = {
        sidebar: {zIndex: 60, left: '-1rem', paddingRight: '1rem', height: '100vh'}
    }


    const handleLogout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("clientId");
        localStorage.removeItem("clientID");
        localStorage.removeItem("clientD");
        localStorage.removeItem("clientToken");
        window.location.href = "/login";
    }

    const openModal = () => {
        dispatch(OpenLogoutModal());
    }

    useEffect(()=>{
        if(!search){
            setToggle(false);
        }else{
            setToggle(true);
        }

    },[search])

    return (
        <>
            <nav className='bg-white flex justify-start md:justify-end lg:justify-end py-4 mb-4'>
                {/* <div className='flex justify-between w-4/12'>
                    <div className="text-[#134FE7] text-sm font-semibold">
                        <span>
                            Welcome
                        </span>
                    </div>
                    
                </div> */}

                <div className='flex justify-end ml-4'>
                    {/* mobile view */}
                    <div className={`container flex justify-start sm:hidden md:hidden lg:hidden xl:hidden ${headPadding}`}>
                        <div className="mr-4" onClick={() => openSidebar()}>
                            <button className="text-3xl text-[#8c8c8c]"  >
                                <FiMenu />
                            </button>
                        </div>
                    </div>
                    {/* mobile view */}
                    <div className="flex justify-start border-2 border-[#f0f0f0] rounded-md">
                        <CiSearch className="text-xl my-auto text-[#8c8c8c] ml-2 mr-4" />
                        <input type="text" placeholder='Search.....' className='w-36 sm:w-50 md:w-60 lg:w-80' onChange={(e)=>setSearch(e.target.value)}/>
                    </div>
                    <div className="mx-4 my-auto">
                        <CiBellOn className='inline-flex text-xl font-semibold my-auto text-[#8c8c8c]'/>
                    </div>
                    <div className="inline-flex rounded-full bg-[#b1bbdf] w-full">
                        {
                            loading ? <AppLoader color="black" /> :
                            <Link to="/profile">
                                <img 
                                    src={profile?.profileImage ? profile.profileImage : defaultProfileImg } 
                                    alt="profile" 
                                    className='rounded-full object-cover w-[40px] h-[40px]' 
                                    width='100%' 
                                    height='40px'  
                                />
                            </Link>
                        }
                    </div>
                </div>

                

                <div className={`
                    absolute left-0 top-0 bottom-0 h-full
                 bg-white text-left w-8/12 px-8 py-4 z-100
                    ${showSideBar ? 'block' : 'hidden'}
                 `} style={customeStyle.sidebar}>
                    <div className='bg-white'>
                        <div className="container text-right">
                            <button className="text-black text-xl" onClick={() => closeSidebar()} >
                                <FaTimes />
                            </button>

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
                                    <Link to="/cryptos">
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
                                    title="Users chats"
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
                                    title="applications"
                                >
                                    <Link to="/job-application">
                                        <div className='flex justify-start'>
                                            <div><span><IoCopyOutline className='text-xl'/></span></div>
                                            <div className='mx-2'>Applications</div>
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

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;