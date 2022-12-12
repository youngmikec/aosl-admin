import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';
import moment from 'moment';

//icons
import { BsFillCaretDownFill } from 'react-icons/bs';

import Card from '../../shared/card';
import { RootState } from '../../store';
import { DELETE_CRYPTO, RETRIEVE_CRYPTOS } from '../../service';
import { ApiResponse, CryptoCurrency } from '../../models';
import { INITIALIZE_CRYPTOS, REMOVE_CRYPTO } from '../../store/cryptos';
import { sortArray } from '../../utils';
import { CloseAppModal, OpenAppModal } from '../../store/modal';
import AppModalComp from '../../shared/app-modal';
import DeleteComp from '../../shared/delete-comp/delete-comp';
import defaultImg from '../../assets/images/default.jpg';
import { BiEditAlt } from 'react-icons/bi';

const GiftcardComp = () => {
    const dispatch = useDispatch();
    const cryptoCurrencies: CryptoCurrency[] = useSelector((state: RootState) => state.cryptosState.value);

    const [deleting, setDeleting] = useState<boolean>(false);
    const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
    const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency | undefined>();
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

    const retrieveCryptos = () => {
        const query: string = `?sort=-createdAt`;
        RETRIEVE_CRYPTOS(query)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            notify("success", message);
            setCryptos(payload);
            dispatch(INITIALIZE_CRYPTOS(payload));
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            notify("error", message);
        });
    };

    const sortData = (field: string) => {
        const sortedArray: any[] = sortArray(cryptos, field);
        if (sortedArray.length > 0) {
          setCryptos(sortedArray);
        }
    };

    const openCryptoModal = (mode: string = 'create', id: string = '') => {
        setModalMode(mode);
        dispatch(OpenAppModal());
    }

    const handleDeleteRecord = (id: string) => {
        setDeleting(true);
        DELETE_CRYPTO(id)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload, success } = res.data;
            if(success){
                setDeleting(false);
                notify("success", message);
                dispatch(REMOVE_CRYPTO(payload.id));
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
        retrieveCryptos();
    }, []);

    useEffect(() => {
        setCryptos(cryptoCurrencies)
    }, [cryptoCurrencies]);

    return (
        <>
            <div className="w-full">
                <Card type='lg'>
                    {/* Title section */}
                    <div id="title">
                        <div className='mb-8'>
                            <h3 className='text-[#8652A4] text-xl font-bold mb-1'>Crypto Records Table</h3>
                            <p className='text-[#7F7F80] text-sm'>Displaying {cryptoCurrencies.length} of {cryptoCurrencies.length} Airtime Record(s)</p>
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
                                    <tr className='border-spacing-y-4'>
                                        <th className="text-left">Crypto code</th>
                                        <th>Name</th>
                                        <th>Rate</th>
                                        <th>Image</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                
                                <tbody className='text-[#7F7F80]'>
                                    {
                                        cryptoCurrencies.length > 0 ?
                                        cryptoCurrencies.map((item: CryptoCurrency) => {
                                            return <tr key={item.code}>
                                                <td className='text-left border-spacing-y-4'>{item?.code}</td>
                                                <td className="text-center py-3">{item?.name}</td>
                                                <td className="text-center py-3">{ item?.rate}</td>
                                                <td className="text-center py-3">
                                                    <img src={item?.cryptoImage || defaultImg } width="25px" height="25px" alt="crypto" />
                                                </td>
                                                <td className="text-center py-3">
                                                    {
                                                        item.status === 'ACTIVE' ? 
                                                        <button className='bg-[#71DD37] text-white text-sm py-1 px-4 rounded-md'>{item.status}</button>
                                                        :
                                                        <button className='bg-[#7F7F80] text-white text-sm py-1 px-4 rounded-md'>{item.status}</button>
                                                    }
                                                </td>
                                                <td className="text-center py-3">
                                                    {moment(item?.createdAt).format("MM-DD-YYYY")}
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
                                                                    setSelectedCrypto(item)
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
                                                                    setSelectedCrypto(item)
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
                                                                setSelectedCrypto(item)
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
                                                <td colSpan={7} className="text-center py-3">No Crypto Record available</td>
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
                    modalMode === 'delete' && <DeleteComp id={selectedCrypto?.id} action={handleDeleteRecord} deleting={deleting} />
                }
            </AppModalComp>

        <ToastContainer />

        </>
    )
}

export default GiftcardComp;