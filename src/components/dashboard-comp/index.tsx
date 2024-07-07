import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

// style
// import "./style.css";
import Card from "../../shared/card";
import DashboardCard from '../dashboard-card';
import { RETRIEVE_APP_REPORTS } from '../../service';
import { Application, Order } from '../../models';
import { BiEditAlt } from 'react-icons/bi';
import AppTable, { TableHeader } from '../../shared/app-table';

const DashboardComp = () => {
    const [searching, setSearching] = useState<boolean>(false);
    
    const [recentApplications, setRecentApplications] = useState<Order[]>([]);
    const [pendingApplications, setPendingApplications] = useState<number>(0);
    const [acceptedApplications, setAcceptedApplications] = useState<number>(0);
    const [totalOrders, setTotalOrders] = useState<number>(0);
    const [users, setUsers] = useState<number>(0);
    const [tableRows, setTableRows] = useState<any[]>([]);

    const notify = (type: string, msg: string) => {
        if (type === "success") {
            toast.success(msg, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }

        if (type === "error") {
            toast.error(msg, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    const tableHeaders: TableHeader[] = [
        { key: 'sn', value: 'S/N' },
        { key: 'code', value: 'Order Code' },
        { key: 'candidateName', value: 'Applicant' },
        { key: 'email', value: 'Email' },
        { key: 'role', value: 'Job Role' },
        { key: 'status', value: 'Status' },
        { key: 'date', value: 'Date/Time' },
    ];

    const retrieveAppReports = () => {
        RETRIEVE_APP_REPORTS().then(res => {
            const { message, payload } = res.data;
            notify('success', message);
            setRecentApplications(payload.recentApplications);
            setPendingApplications(payload.pendingApplications);
            setAcceptedApplications(payload.acceptedApplications);
            setTotalOrders(payload.totalOrders);
            setUsers(payload.users);
            const mappedDate = payload.recentApplications.map((item: Application, idx: number) => {
                return {
                    sn: idx + 1,
                    code: item?.code,
                    candidateName: `${item?.firstName} ${item?.lastName}`,
                    email: item?.email,
                    role: item?.role, 
                    status: item.status === 'DECLINED' ? 
                    <button className='border-[#FF3E1D] border-2 text-[#FF3E1D] text-sm py-1 px-4 rounded-md'>{item.status}</button>
                    :
                    <button className='bg-[#71DD37] text-white text-sm py-1 px-4 rounded-md'>{item.status}</button>,
                    date: moment(item?.createdAt).format("MM-DD-YYYY"),
                }
            });
            setTableRows(mappedDate);
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
                    <DashboardCard title='Total Users' value={users} bgColor="#134FE79a" txtColor='#ffffff' />
                </div>
                <div>
                    <DashboardCard title='Pending Applications' value={pendingApplications} bgColor="#ffffff" txtColor='#134FE7' />
                </div>
                <div>
                    <DashboardCard title='Accepted Applications' value={acceptedApplications} bgColor="#ff6702b9" txtColor='#ffffff' />
                </div>
                <div>
                    <DashboardCard title='Total Orders' value={totalOrders} bgColor="#ffffff" txtColor='#134FE7' />
                </div>
                        
            </div>

            <section className='mt-8 mb-4'>
                <h4 className='text-xl text-[#134FE7] font-bold'>Recent Orders</h4>
            </section>

            <section >
                <Card type='sm'>
                    {/* Title section */}
                    <div id="title">
                        <div className="flex flex-col sm:justify-between md:justify-between lg:flex-row lg:justify-between w-full">
                            <div className='mb-8'>
                                <h3 className='text-[#134FE7] text-xl mb-1'>Job/Training Applications Table</h3>
                                <p className='text-[#7F7F80] text-sm'>Displaying {recentApplications.length} of { recentApplications.length } Order Record(s)</p>
                            </div>
                        </div>

                    </div>

                    {/* Title section */}
                    <AppTable tableHeaders={tableHeaders} tableRows={tableRows} />
                </Card>
            </section>

            <ToastContainer />
        </>
    )
}

export default DashboardComp;