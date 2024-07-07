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
import { DELETE_ORDER, RETRIEVE_ORDERS, UPDATE_ORDER } from '../../service';
import { BiEditAlt } from 'react-icons/bi';
import SortComp from '../../shared/sort-comp';
import OrderDetailComp from './order-detail';
import AppTable, { TableHeader } from '../../shared/app-table';
import DropdownComp, { DropdownList } from '../../shared/dropdown';

const OrdersComp = () => {
    const dispatch = useDispatch();
    const Orders: Order[] = useSelector((state: RootState) => state.ordersState.value);

    const [deleting, setDeleting] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [tableRows, setTableRows] = useState<any[]>([]);

    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | undefined>();
    const [modalMode, setModalMode] = useState<string>('');

    const tableHeaders: TableHeader[] = [
        { key: 'sn', value: 'S/N' },
        { key: 'orderCode', value: 'Order Code' },
        { key: 'type', value: 'Type' },
        { key: 'email', value: 'Email' },
        { key: 'amount', value: 'Amount' },
        { key: 'date', value: 'Date' },
        { key: 'status', value: 'Status' },
        { key: 'proofImg', value: 'Image' },
        { key: 'actions', value: 'Actions' },
    ];

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

    const populateActions = (item: Order): DropdownList[] => {
        const tableActions: DropdownList[] = [
            { 
                label: 'View Detail', 
                disabled: false,
                action: () => {
                    setSelectedOrder(item)
                    openCryptoModal('view');
                }
            },
            { 
                label: 'Complete Order', 
                disabled: item.status !== "COMPLETED" ? false : true,
                action: () => {
                    handleOrderComplete(item.id, "COMPLETED")
                }
            },
            { 
                label: 'Delete Order', 
                disabled: false,
                action: () => {
                    setSelectedOrder(item)
                    openCryptoModal('delete')
                }
            },
        ]
        return tableActions;
    }


    const retrieveOrders = () => {
        const query: string = `?sort=-createdAt&populate=user,createdBy,airtime,giftcard,cryptocurrency`;
        RETRIEVE_ORDERS(query)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            notify("success", message);
            setOrders(payload);
            
            const mappedDate = payload.map((item: Order, idx: number) => {
                const actions = populateActions(item);
                console.log('actions', actions);
                return {
                    sn: idx + 1,
                    orderCode: item.orderCode,
                    type: item.orderType,
                    email: item.user?.email,
                    amount: item.amount,
                    date: moment(item?.createdAt).format("MM-DD-YYYY"),
                    status: item?.status === 'PENDING' ? 
                    <button className='border-[#FF3E1D] border-2 text-[#FF3E1D] text-sm py-1 px-4 rounded-md'>{item.status}</button>
                    :
                    <button className='bg-[#71DD37] text-white text-sm py-1 px-4 rounded-md'>{item.status}</button>,
                    proofImg: item.proofImage !== undefined || '' ? 
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
                                <button className='bg-[#7F7F80] text-white text-sm py-1 px-4 rounded-md'>No proof</button>,
                    actions: <DropdownComp dropdownList={actions} />
                }
            });
            setTableRows(mappedDate);
            dispatch(INITIALIZE_ORDERS(payload));
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            notify("error", message);
        });
    };


    const handleSearchQuery = () => {
        setSearching(true);
        if(searchQuery !== '') {
            const filteredResults: Order[] = orders.filter((item: Order) => Object.values(item).includes(searchQuery));
            setOrders(filteredResults);
            setSearching(false);
        }else {
            setOrders(Orders);
            setSearching(false);
        }
    }

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

    const handleOrderComplete = (id: string, status: string) => {
        const data = { status };
        UPDATE_ORDER(id, data)
          .then((res: AxiosResponse<ApiResponse>) => {
            const { message } = res.data;
            notify("success", message);
            retrieveOrders();
          })
          .catch((err: any) => {
            const { message } = err.response.data;
            notify("error", message);
          });
    };
    
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
                            <h3 className='text-[#134FE7] text-xl font-bold mb-1'>Orders Table</h3>
                            <p className='text-[#7F7F80] text-sm'>Displaying {orders.length} of {Orders.length} Order(s)</p>
                        </div>
                    </div>
                    {/* Title section */}
                    <AppTable tableHeaders={tableHeaders} tableRows={tableRows} />
                    

                </Card>
            </div>

            <AppModalComp title=''>
                {/* {
                    modalMode === 'create' && <CryptoForm />
                } */}
                {
                    modalMode === 'view' && <OrderDetailComp order={selectedOrder} />
                }
                {/* {
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