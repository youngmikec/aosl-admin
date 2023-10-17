import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';
import moment from 'moment';

//icons
import { BiEditAlt } from 'react-icons/bi';

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
import SortComp from '../../shared/sort-comp';
import CryptoForm from './crypto-form';
import CryptoDetailComp from './crypto-detail';
import CryptoUpdateForm from './crypto-update-form';
import AppTable, { TableHeader } from '../../shared/app-table';
import DropdownComp, { DropdownList } from '../../shared/dropdown';

const CryptoComp = () => {
    const dispatch = useDispatch();
    const cryptoCurrencies: CryptoCurrency[] = useSelector((state: RootState) => state.cryptosState.value);

    const [deleting, setDeleting] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
    const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency | undefined>();
    const [modalMode, setModalMode] = useState<string>('');
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
        { key: 'code', value: 'Crypto Code' },
        { key: 'name', value: 'Name' },
        { key: 'rate', value: 'Buy Rate' },
        { key: 'sellingRate', value: 'Selling Rate' },
        { key: 'image', value: 'Image' },
        { key: 'status', value: 'Status' },
        { key: 'date', value: 'Date' },
        { key: 'actions', value: 'Actions' },
    ];

    const populateActions = (item: CryptoCurrency): DropdownList[] => {
        console.log('user', item);
        const tableActions: DropdownList[] = [
            { 
                label: 'View Detail', 
                disabled: false,
                action: () => {
                    setSelectedCrypto(item)
                    openModal('view');
                }
            },
            { 
                label: 'Update Crypto', 
                disabled: false,
                action: () => {
                    setSelectedCrypto(item)
                    openModal('update');
                }
            },
            { 
                label: 'Delete Crypto', 
                disabled: false,
                action: () => {
                    setSelectedCrypto(item);
                    openModal('delete');
                }
            },
        ]
        return tableActions;
    }

    const retrieveCryptos = () => {
        const query: string = `?sort=-createdAt&populate=createdBy`;
        RETRIEVE_CRYPTOS(query)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            notify("success", message);
            setCryptos(payload);
            const mappedDate = payload.map((item: CryptoCurrency, idx: number) => {
                const actions = populateActions(item);
                return {
                    sn: idx + 1,
                    code: item?.code,
                    name: item?.name,
                    rate: item?.rate,
                    sellingRate: item?.sellingRate,
                    image: <img src={item?.cryptoImage || defaultImg } width="25px" height="25px" alt="crypto" />,
                    status: item.status === 'ACTIVE' ? 
                    <button className='bg-[#71DD37] text-white text-sm py-1 px-4 rounded-md'>{item.status}</button>
                    :
                    <button className='bg-[#7F7F80] text-white text-sm py-1 px-4 rounded-md'>{item.status}</button>,
                    date: moment(item?.createdAt).format("MM-DD-YYYY"),
                    actions: <DropdownComp dropdownList={actions} />
                }
            });
            setTableRows(mappedDate);
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

    const openModal = (mode: string = 'create', id: string = '') => {
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

    const handleSearchQuery = () => {
        setSearching(true);
        if(searchQuery !== '') {
            const filteredResults: CryptoCurrency[] = cryptos.filter((item: CryptoCurrency) => Object.values(item).includes(searchQuery));
            setCryptos(filteredResults);
            setSearching(false);
        }else {
            setCryptos(cryptoCurrencies);
            setSearching(false);
        }
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
                        <div className="flex flex-col sm:justify-between md:justify-between lg:flex-row lg:justify-between w-full">
                            <div className='mb-8'>
                                <h3 className='text-[#8652A4] text-xl font-bold mb-1'>Crypto Records Table</h3>
                                <p className='text-[#7F7F80] text-sm'>Displaying {cryptos.length} of {cryptos.length} Crypto Record(s)</p>
                            </div>

                            <div className='mb-8'>
                                <button 
                                    className='bg-[#8652A4] text-white py-2 px-4 rounded-md'
                                    onClick={() => openModal('create')}
                                >
                                    Create Crypto
                                </button>
                            </div>

                        </div>

                        {/* <div className="flex flex-col sm:justify-between md:justify-between lg:flex-row lg:justify-between w-full">
                            <div className='my-2 md:my-0 lg:my-0'>
                                <SortComp sortData={sortData} />
                            </div>

                            <div>
                                <div className='border-2 border-[#ececec] flex justify-start w-max rounded-md'>
                                    <input 
                                        type="text" 
                                        className='lg:w-80 px-3 py-1'
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
                        </div> */}
                    </div>
                    {/* Title section */}

                    <AppTable tableHeaders={tableHeaders} tableRows={tableRows} />
                </Card>
            </div>

            <AppModalComp title=''>
                {
                    modalMode === 'create' && <CryptoForm />
                }
                {
                    modalMode === 'view' && <CryptoDetailComp crypto={selectedCrypto} />
                }
                {
                    modalMode === 'update' && <CryptoUpdateForm crypto={selectedCrypto}  />
                }
                {
                    modalMode === 'delete' && <DeleteComp id={selectedCrypto?.id} action={handleDeleteRecord} deleting={deleting} />
                }
            </AppModalComp>

            <ToastContainer />

        </>
    )
}

export default CryptoComp;