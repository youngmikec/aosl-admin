import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';
import moment from 'moment';

//icons
import { BiEditAlt } from 'react-icons/bi';

import Card from '../../shared/card';
import { sortArray } from '../../utils';
import { RootState } from '../../store';
import { DELETE_AIRTIME, RETREIVE_AIRTIME } from '../../service';
import { Airtime, ApiResponse } from '../../models';
import { CloseAppModal, OpenAppModal } from '../../store/modal';
import AppModalComp from '../../shared/app-modal';
import DeleteComp from '../../shared/delete-comp/delete-comp';
import defaultImg from '../../assets/images/default.jpg';
import { INITIALIZE_AIRTIMES, REMOVE_AIRTIME } from '../../store/airtime';
import AirtimeForm from './airtime-form';
import SortComp from '../../shared/sort-comp';
import AirtimeDetailComp from './airtime-details';
import AirtimeUpdateForm from './airtime-update-form';
import AppTable, { TableHeader } from '../../shared/app-table';
import DropdownComp, { DropdownList } from '../../shared/dropdown';

const AirtimeComp = () => {
    const dispatch = useDispatch();
    const Airtimes: Airtime[] = useSelector((state: RootState) => state.airtimeState.value);

    const [deleting, setDeleting] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [airtimes, setAirtimes] = useState<Airtime[]>([]);
    const [selectedAirtime, setSelectedAirtime] = useState<Airtime | undefined>();
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
        { key: 'code', value: 'Airtime Code' },
        { key: 'name', value: 'Name' },
        { key: 'rate', value: 'Rate' },
        { key: 'image', value: 'Image' },
        { key: 'status', value: 'Status' },
        { key: 'date', value: 'Date' },
        { key: 'actions', value: 'Actions' },
    ];

    const populateActions = (item: Airtime): DropdownList[] => {
        console.log('user', item);
        const tableActions: DropdownList[] = [
            { 
                label: 'View Detail', 
                disabled: false,
                action: () => {
                    setSelectedAirtime(item)
                    openModal('view');
                }
            },
            { 
                label: 'Update Airtime', 
                disabled: false,
                action: () => {
                    setSelectedAirtime(item)
                    openModal('update');
                }
            },
            { 
                label: 'Delete Airtime', 
                disabled: false,
                action: () => {
                    setSelectedAirtime(item);
                    openModal('delete');
                }
            },
        ]
        return tableActions;
    }

    const retrieveAirtimes = () => {
        const query: string = `?sort=-name&populate=createdBy`;
        RETREIVE_AIRTIME(query)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            notify("success", message);
            setAirtimes(payload);
            const mappedDate = payload.map((item: Airtime, idx: number) => {
                const actions = populateActions(item);
                return {
                    sn: idx + 1,
                    code: item?.code,
                    name: item?.name,
                    rate: item?.rate,
                    image: <img src={item?.networkImage || defaultImg } width="25px" height="25px" alt="crypto" />,
                    status: item.status === 'ACTIVE' ? 
                    <button className='bg-[#71DD37] text-white text-sm py-1 px-4 rounded-md'>{item.status}</button>
                    :
                    <button className='bg-[#7F7F80] text-white text-sm py-1 px-4 rounded-md'>{item.status}</button>,
                    date: moment(item?.createdAt).format("MM-DD-YYYY"),
                    actions: <DropdownComp dropdownList={actions} />
                }
            });
            setTableRows(mappedDate);
            dispatch(INITIALIZE_AIRTIMES(payload));
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            notify("error", message);
        });
    };

    const sortData = (field: string) => {
        const sortedArray: any[] = sortArray(airtimes, field);
        if (sortedArray.length > 0) {
          setAirtimes(sortedArray);
        }
    };

    const openModal = (mode: string = 'create', id: string = '') => {
        setModalMode(mode);
        dispatch(OpenAppModal());
    }

    const handleDeleteRecord = (id: string) => {
        setDeleting(true);
        DELETE_AIRTIME(id)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload, success } = res.data;
            if(success){
                setDeleting(false);
                notify("success", message);
                dispatch(REMOVE_AIRTIME(payload.id));
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
            const filteredResults: Airtime[] = airtimes.filter((item: Airtime) => Object.values(item).includes(searchQuery));
            setAirtimes(filteredResults);
            setSearching(false);
        }else {
            setAirtimes(Airtimes);
            setSearching(false);
        }
    }
    
    useEffect(() => {
        retrieveAirtimes();
    }, []);

    useEffect(() => {
        setAirtimes(Airtimes)
    }, [Airtimes]);

    return (
        <>
            <div className="w-full">
                <Card type='lg'>
                    {/* Title section */}
                    <div id="title">
                        <div className="flex flex-col sm:justify-between md:justify-between lg:flex-row lg:justify-between w-full">
                            <div className='mb-8'>
                                <h3 className='text-[#8652A4] text-xl font-bold mb-1'>Airtime Records Table</h3>
                                <p className='text-[#7F7F80] text-sm'>Displaying {airtimes.length} of {airtimes.length} Airtime Record(s)</p>
                            </div>

                            <div className='mb-8'>
                                <button 
                                    className='bg-[#8652A4] text-white py-2 px-4 rounded-md'
                                    onClick={() => openModal('create')}
                                >
                                    Create Airtime
                                </button>
                            </div>

                        </div>

                        {/* <div className="flex flex-col sm:justify-between md:justify-between lg:flex-row lg:justify-between w-full">
                            <div>
                                <SortComp sortData={sortData} />
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
                        </div> */}
                    </div>
                    {/* Title section */}

                    <AppTable tableHeaders={tableHeaders} tableRows={tableRows} />
                
                </Card>
            </div>

            <AppModalComp title=''>
                {
                    modalMode === 'create' && <AirtimeForm />
                }
                {
                    modalMode === 'view' && <AirtimeDetailComp airtime={selectedAirtime} />
                }
                {
                    modalMode === 'update' && <AirtimeUpdateForm airtime={selectedAirtime}  />
                }
                {
                    modalMode === 'delete' && <DeleteComp id={selectedAirtime?.id} action={handleDeleteRecord} deleting={deleting} />
                }
            </AppModalComp>

        <ToastContainer />

        </>
    )
}

export default AirtimeComp;