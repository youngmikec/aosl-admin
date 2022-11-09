import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

type Props = {
    sidebarMenus?: any[]
}

const Sidebar = ({sidebarMenus}: Props) => {
    const location = useLocation();
    return (
        <>
            <div className="bg-white min-h-screen max-h-fit px-4 py-5">
                <div className="my-5 px-4">
                    <img src={logo} alt="logo" width="100px" height="100px" />
                </div>
                <ul className="list-none">
                    <li className='my-6 py-3 px-4 text-center rounded-md hover:bg-[#8652A4] hover:text-white' title="Dashboard">
                        <Link to="/users-dashboard">
                            Dashboard       
                        </Link>
                    </li>
                    <li className='my-6 py-3 px-4 text-center rounded-md hover:bg-[#8652A4] hover:text-white' title="Dashboard">
                        <Link to="/dashboard">
                            Wallet       
                        </Link>
                    </li>
                    <li className='my-6 py-3 px-4 text-center rounded-md hover:bg-[#8652A4] hover:text-white' title="Dashboard">
                        <Link to="/sell-crypto">
                            Sell Crypto       
                        </Link>
                    </li>
                    <li className='my-6 py-3 px-4 text-center rounded-md hover:bg-[#8652A4] hover:text-white' title="Dashboard">
                        <Link to="/buy-crypto">
                            Buy Crypto       
                        </Link>
                    </li>
                    <li className='my-6 py-3 px-4 text-center rounded-md hover:bg-[#8652A4] hover:text-white' title="Dashboard">
                        <Link to="/trade-giftcard">
                            Trade Giftcard       
                        </Link>
                    </li>
                    <li className='my-6 py-3 px-4 text-center rounded-md hover:bg-[#8652A4] hover:text-white' title="Dashboard">
                        <Link to="/airtime">
                            Airtime to Cash      
                        </Link>
                    </li>
                    <li className='my-6 py-3 px-4 text-center rounded-md hover:bg-[#8652A4] hover:text-white' title="Dashboard">
                        <Link to="/history">
                            Order History      
                        </Link>
                    </li>
                    <li className='my-6 py-3 px-4 text-center rounded-md hover:bg-[#8652A4] hover:text-white' title="Dashboard">
                        <Link to="/account">
                            Account Settings     
                        </Link>
                    </li>

                   
                    
                </ul>
            </div>
        </>
    )
}

export default Sidebar;