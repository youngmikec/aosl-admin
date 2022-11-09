import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//  icons
import{CiSearch} from 'react-icons/ci';
import {CiBellOn} from 'react-icons/ci';


// styles
import './style.css';

// logo
import profile from '../../assets/images/arash.png';


const Navbar = () => {
    const[ toggle, setToggle] = useState(true);
    const [search,setSearch]=useState('');

    useEffect(()=>{
        if(!search){
            setToggle(false);
        }else{
            setToggle(true);
        }

    },[search])

    return (
        <>
            <nav className='bg-white flex justify-between py-4 mb-4'>
                <div className='flex justify-between w-4/12'>
                    <div className="text-[#8652A4] text-sm font-semibold">
                        <span>
                            <Link to="/users-dashboard">Home</Link>
                        </span>
                    </div>
                    <div className="text-[#8c8c8c] text-sm font-semibold">
                        <span>
                            <Link to="/users-dashboard">How to trade</Link>
                        </span>
                    </div>
                    <div className="text-[#8c8c8c] text-sm font-semibold">
                        <span>
                            <Link to="/users-dashboard">chat</Link>
                        </span>
                    </div>

                    
                </div>

                <div className='flex justify-end ml-4'>
                    <div className="flex justify-start border-2 border-[#f0f0f0] rounded-md">
                        <CiSearch className="text-xl my-auto text-[#8c8c8c] ml-2 mr-4" />
                        <input type="text" placeholder='Search.....' className='w-80' onChange={(e)=>setSearch(e.target.value)}/>
                    </div>
                    <div className="mx-4 my-auto">
                        <CiBellOn className='inline-flex text-xl font-semibold my-auto text-[#8c8c8c]'/>
                    </div>
                    <div className="inline-flex rounded-full bg-[#b1bbdf]">
                        <Link to="/account">
                            <img src={profile} alt="profile" className='' width='40px' height='40px'  />
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;