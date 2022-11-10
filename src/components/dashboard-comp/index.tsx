import React from 'react';

// icons
import {HiUsers} from 'react-icons/hi'
import{BiMenuAltRight} from 'react-icons/bi';
import{HiOutlineTrash} from 'react-icons/hi';

// image
import image from '../../assets/images/account-balance-bg.png';

// style
// import "./style.css";
import Card from "../../shared/card";

const DashboardComp = () => {
  return (
    <>
        <div>    
            {/* FIRST SECTION STARTS HERE */}

            <div className='section-1'>
                <section>
                    <img src={image} alt="img" className='wallet' />
                    <HiUsers className='icon-acct'/>
                    <p className='visitor'>Total Visitor</p>
                    <h1 className='money'>1,123</h1>
                    <BiMenuAltRight className='total-orders'/>
                    <p className='orders'>Total Orders</p>
                    <h1 className='total-amount'>1,000</h1>
                    <img src={image} alt="" className='pending-orders'/>
                    <HiUsers className='pending-visitor'/>
                    <p className='total-prnding'>Total pending orders</p>
                    <h1 className='total_pending-amount'>1,123</h1>
                    <BiMenuAltRight className='total_successful-orders'/>
                    <p className='successful-orders'>Total Orders</p>
                    <h1 className='successful-amount'>1,000</h1>
                
                    <div className='Recent-order'>
                    Recent order
                    </div>
                </section>

                <section className='section-2'>
                    <div className='customer-table'>
                        <h2>Customers Table</h2>
                        <p className='displaying'>Displaying 3 of 3  User(s)</p>
                        <input type="text" className='search-order' />
                        <button>search</button>
                    </div>

                    <div>
                        <h3 className='text-[#121212]'>Recent Transanctions</h3>
                        <Card type='lg'>
                        <table className='table mx-auto  px-5 my-16' id='table'>
                            <thead className='text-left'>
                                <tr className='flex justify-around'>
                                    <th>Action(s)</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th className='pl-20'>Created at</th>
                                    <th>Status</th>
                                </tr>
                                <hr/>
                            </thead>
                            <tbody className='w-10/12 text-sm '>
                                <tr className='flex justify-around mb-2 mt-4 pl-12	'>
                                    <td><HiOutlineTrash className='HiOutlineTrash'/></td>
                                    <td className='pl-12'>princess amaka</td>
                                    <td>princesobinan@gmail.com</td>
                                    <td>2021-12-08 19:50:00</td>
                                    <td className='completed'>Completed</td>

                                </tr>
                                <hr />
                                <tr className='flex justify-around mb-2 mt-4 pl-12' >
                                    <td><HiOutlineTrash className='HiOutlineTrash'/></td>
                                    <td className='pl-12'>princess amaka</td>
                                    <td>princesobinan@gmail.com</td>
                                    <td>2021-12-08 19:50:00</td>
                                    <td className='completed'>Completed</td>
                                </tr>
                                <hr />
                                <tr className='flex justify-around mb-2 mt-4 pl-12'>
                                <td className='HiOutlineTrash'><HiOutlineTrash className='HiOutlineTrash'/></td>
                                <td className='pl-12'>princess amaka</td>
                                <td>princesobinan@gmail.com</td>
                                <td>2021-12-08 19:50:00</td>
                                <td className='completed'>Completed</td>
                                </tr>
                                <hr />

                                <tr className='flex justify-around mb-2 mt-4 pl-12'>
                                    <td className='HiOutlineTrash'><HiOutlineTrash className='HiOutlineTrash'/></td>
                                    <td className='pl-12'>princess amaka</td>
                                    <td>princesobinan@gmail.com</td>
                                    <td>2021-12-08 19:50:00</td>
                                    <td className='completed'>Completed</td>
                                </tr>
                                <hr />
                            </tbody>

                        </table>
                        </Card>
                    </div>
                </section>
            </div>
        </div>
    </>
  )
}

export default DashboardComp