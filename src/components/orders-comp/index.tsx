import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';
import moment from 'moment';

//icons
import { BsFillCaretDownFill, BsImage } from 'react-icons/bs';

import { ApiResponse, Order } from '../../models';
import Card from '../../shared/card';
import { RootState } from '../../store';
import { sortArray } from '../../utils';
import { CloseAppModal, OpenAppModal } from '../../store/modal';
import AppModalComp from '../../shared/app-modal';
import DeleteComp from '../../shared/delete-comp/delete-comp';
import { INITIALIZE_ORDERS, REMOVE_ORDER } from '../../store/orders';
import { DELETE_ORDER, RETRIEVE_ORDERS } from '../../service';
import { BiEditAlt } from 'react-icons/bi';

const OrdersComp = () => {
    const dispatch = useDispatch();
    const Orders: Order[] = useSelector((state: RootState) => state.ordersState.value);

    const [deleting, setDeleting] = useState<boolean>(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | undefined>();
    const [modalMode, setModalMode] = useState<string>('');

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

    const retrieveOrders = () => {
        const query: string = `?sort=-createdAt&populate=user`;
        RETRIEVE_ORDERS(query)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            notify("success", message);
            setOrders(payload);
            dispatch(INITIALIZE_ORDERS(payload));
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            notify("error", message);
        });
    };

    const sortData = (field: string) => {
        const sortedArray: any[] = sortArray(orders, field);
        if (sortedArray.length > 0) {
          setOrders(sortedArray);
        }
    };

    const openCryptoModal = (mode: string = 'create', id: string = '') => {
        setModalMode(mode);
        dispatch(OpenAppModal());
    }

    const handleDeleteRecord = (id: string) => {
        setDeleting(true);
        DELETE_ORDER(id)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload, success } = res.data;
            if(success){
                setDeleting(false);
                notify("success", message);
                dispatch(REMOVE_ORDER(payload.id));
                dispatch(CloseAppModal());
            }
        })
        .catch((err: any) => {
            setDeleting(false);
            const { message } = err.response.data;
            notify("error", message);
        });
    }
    
    useEffect(() => {
        retrieveOrders();
    }, []);

    useEffect(() => {
        setOrders(Orders)
    }, [Orders]);

    return (
        <>
            <div className="w-full">
                <Card type='lg'>
                    {/* Title section */}
                    <div id="title">
                        <div className='mb-8'>
                            <h3 className='text-[#8652A4] text-xl font-bold mb-1'>Orders Table</h3>
                            <p className='text-[#7F7F80] text-sm'>Displaying {orders.length} of {Orders.length} Order(s)</p>
                        </div>

                        <div className="flex justify-between">
                            <div>
                                <div className='w-max text-[#7F7F80] text-sm text-sm py-1 px-4 border-2 border-[#ececec] rounded-md'>
                                    <span className='mx-1 inline-block'>sort by type</span>
                                    <span className='mx-1 inline-block'> <BsFillCaretDownFill /> </span>
                                </div>
                            </div>

                            <div>
                                <div className='border-2 border-[#ececec] flex justify-start w-max rounded-md'>
                                    <input type="text" className='lg:w-80' />
                                    <button className='bg-[#8652A4] text-white text-sm px-6 py-2 rounded-md'>Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Title section */}

                    <div className='my-8'>
                        <div className='w-full overflow-x-scroll'>
                            <table className='table border w-full'>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Type</th>
                                        <th>Email address</th>
                                        <th>Date/Time</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Card proof</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <br />
                                <tbody className='text-[#7F7F80]'>
                                    {
                                        orders.length > 0 ?
                                        orders.map((item: Order, idx: number) => {
                                            return <tr key={idx}>
                                                <td>{item.orderCode}</td>
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
                                                <td>
                                                    {
                                                        item.proofImage !== undefined || '' ? 
                                                        <button 
                                                            className='bg-[#7F7F80] text-white text-sm py-1 px-4 rounded-md'
                                                            onClick={() => {
                                                                setSelectedOrder(item)
                                                                openCryptoModal('preview')
                                                            }}
                                                        >
                                                            <span className='mr-1 text-xs inline-flex'><BsImage /></span>
                                                            view
                                                        </button>
                                                        :
                                                        <button className='bg-[#7F7F80] text-white text-sm py-1 px-4 rounded-md'>No proof</button>
                                                    }
                                                </td>
                                            
                                                <td className="text-center py-3">
                                                    <div
                                                    className="relative mx-1 px-1 py-2 group  mb-1 md:mb-0"
                                                    id="button_pm"
                                                    >
                                                    <span className="firstlevel hover:text-red-500 whitespace-no-wrap text-gray-600 hover:text-blue-800">
                                                        <BiEditAlt className="text-blue hover:cursor-pointer inline" />
                                                    </span>
                                                    <ul className="w-max absolute left-0 top-0 mt-10 p-2 rounded-lg shadow-lg bg-[#F6F6F6] z-10 hidden group-hover:block">
                                                        <svg
                                                        className="block fill-current text-[#F6F6F6] w-4 h-4 absolute left-0 top-0 ml-3 -mt-3 z-0"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        >
                                                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                                        </svg>
                                                                                                                
                                                        <li className="hover:bg-[#8652A4] hover:cursor-pointer pr-10 p-1 whitespace-no-wrap rounded-md hover:text-white text-sm md:text-base ">
                                                        <span 
                                                                className="items-left px-2 py-2"
                                                                onClick={() => {
                                                                    setSelectedOrder(item)
                                                                    openCryptoModal('view');
                                                                }}
                                                            >
                                                                View Detail
                                                            </span>
                                                        </li>

                                                        <li className="hover:bg-[#8652A4] hover:cursor-pointer pr-10 p-1 whitespace-no-wrap rounded-md hover:text-white text-sm md:text-base ">
                                                            <span 
                                                                className="items-left px-2 py-2"
                                                                onClick={() => {
                                                                    setSelectedOrder(item)
                                                                    openCryptoModal('update');
                                                                }}
                                                            >
                                                                Update Crypto
                                                            </span>
                                                        </li>

                                                        <li className="hover:bg-[#8652A4] hover:cursor-pointer pr-10 p-1 whitespace-no-wrap rounded-md hover:text-white text-sm md:text-base ">
                                                            <span 
                                                                className="items-left px-2 py-2"
                                                                onClick={() => {
                                                                setSelectedOrder(item)
                                                                openCryptoModal('delete')
                                                                }}
                                                            >
                                                                Delete User
                                                            </span>
                                                        </li>
                                                    </ul>
                                                    </div>
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
                    </div>
                </Card>
            </div>

            <AppModalComp title=''>
                {/* {
                    modalMode === 'create' && <CryptoForm />
                }
                {
                    modalMode === 'view' && <div>welcome to view product modal</div>
                }
                {
                    modalMode === 'update' && <CryptoUpdateForm crypto={selectedCrypto}  />
                } */}
                {
                    modalMode === 'preview' && 
                    <div className='text-center mx-auto w-full lg:w-8/12 p-4'>
                        <div className='w-full'>
                            <img src={selectedOrder?.proofImage} width="100%" height="100%" alt="ordr proof" />
                        </div>
                    </div>
                }
                {
                    modalMode === 'delete' && <DeleteComp id={selectedOrder?.id} action={handleDeleteRecord} deleting={deleting} />
                }
            </AppModalComp>

            <ToastContainer />
        </>
    )
}

export default OrdersComp;