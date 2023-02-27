import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

// style
// import "./style.css";
import Card from "../../shared/card";
import DashboardCard from '../dashboard-card';
import { RETRIEVE_APP_REPORTS } from '../../service';
import { Order } from '../../models';
import { BiEditAlt } from 'react-icons/bi';

const DashboardComp = () => {
    const [searching, setSearching] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [pendingOrders, setPendingOrders] = useState<number>(0);
    const [completedOrders, setCompletedOrders] = useState<number>(0);
    const [totalOrders, setTotalOrders] = useState<number>(0);
    const [users, setUsers] = useState<number>(0);

    const notify = (type: string, msg: string) => {
        if(type === 'success'){
            toast.success(msg, {
                position: toast.POSITION.TOP_RIGHT
            });
        }

        if(type === 'error'){
            toast.error(msg, {
              position: toast.POSITION.TOP_RIGHT
            }); 
        }
    };

    const retrieveAppReports = () => {
        RETRIEVE_APP_REPORTS().then(res => {
            const { message, payload } = res.data;
            notify('success', message);
            setRecentOrders(payload.recentOrders);
            setPendingOrders(payload.pendingOrders);
            setCompletedOrders(payload.completedOrders);
            setTotalOrders(payload.totalOrders);
            setUsers(payload.users);
        }).catch(err => {
            const { message } = err.response.data;
            notify('error', message);
        });
        
    }

    useEffect(() => {
        retrieveAppReports();
    }, []);


    const handleSearchQuery = () => {
        setSearching(true);
        // if(searchQuery !== '') {
        //     const filteredResults: CryptoCurrency[] = cryptos.filter((item: CryptoCurrency) => Object.values(item).includes(searchQuery));
        //     setCryptos(filteredResults);
        //     setSearching(false);
        // }else {
        //     setCryptos(cryptoCurrencies);
        //     setSearching(false);
        // }
    }

    return (
        <>
            <div 
                className='grid 
                    grid-cols-1 space-y-2
                    sm:grid-cols-2 sm:space-x-2 sm:space-y-2
                    md:grid-cols-2 md:space-x-2 md:space-y-2
                    lg:grid-cols-4 lg:space-x-3 lg:space-y-0'
            >
                <div>
                    <DashboardCard title='Total Users' value={users} bgColor="#8652a49a" txtColor='#ffffff' />
                </div>
                <div>
                    <DashboardCard title='Pending Orders' value={pendingOrders} bgColor="#ffffff" txtColor='#8652A4' />
                </div>
                <div>
                    <DashboardCard title='Completed Orders' value={completedOrders} bgColor="#ff6702b9" txtColor='#ffffff' />
                </div>
                <div>
                    <DashboardCard title='Total Orders' value={totalOrders} bgColor="#ffffff" txtColor='#8652A4' />
                </div>
                        
            </div>

            <section className='mt-8 mb-4'>
                <h4 className='text-xl text-[#8652a4] font-bold'>Recent Orders</h4>
            </section>

            <section >
                <Card type='sm'>
                    {/* Title section */}
                    <div id="title">
                        <div className="flex flex-col sm:justify-between md:justify-between lg:flex-row lg:justify-between w-full">
                            <div className='mb-8'>
                                <h3 className='text-[#8652A4] text-xl mb-1'>Orders Records Table</h3>
                                <p className='text-[#7F7F80] text-sm'>Displaying {recentOrders.length} of { recentOrders.length } Order Record(s)</p>
                            </div>

                            
                            <div>
                                <div className='border-2 border-[#ececec] flex justify-start w-max rounded-md'>
                                    <input 
                                        type="text" 
                                        className='w-40 md:w-60 lg:w-80 px-3 py-1'
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button 
                                        className='bg-[#8652A4] text-white text-sm px-6 py-2 rounded-md'
                                        onClick={() => handleSearchQuery()}
                                    >
                                        { searching ? 'searching...' : 'Search' }
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* Title section */}
                    <div className='mt-4 w-full overflow-x-scroll'>
                        <table className='table border w-full'>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Type</th>
                                    <th>Email address</th>
                                    <th>Date/Time</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody className='text-[#7F7F80]'>
                                {
                                    recentOrders.length > 0 ?
                                    recentOrders.map((item: Order, idx: number) => {
                                        return <tr key={idx}>
                                            <td>#{idx + 1}</td>
                                            <td>{item.orderType}</td>
                                            <td>{item.user?.email}</td>
                                            <td className="text-center py-3">
                                                {moment(item?.createdAt).format("MM-DD-YYYY")}
                                            </td>
                                            <td>N {item.amount}</td>
                                            <td>
                                                {
                                                    item.status === 'PENDING' ? 
                                                    <button className='border-[#FF3E1D] border-2 text-[#FF3E1D] text-sm py-1 px-4 rounded-md'>{item.status}</button>
                                                    :
                                                    <button className='bg-[#71DD37] text-white text-sm py-1 px-4 rounded-md'>{item.status}</button>
                                                }
                                            </td>
                                            
                                        </tr>
                                    }) :
                                    <tr>
                                        <td colSpan={7} className="text-center py-3">No Order Record available</td>
                                    </tr>
                                }
                                
                                
                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>

            <ToastContainer />
        </>
    )
}

export default DashboardComp;