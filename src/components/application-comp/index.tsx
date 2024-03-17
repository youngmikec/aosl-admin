import React, { useState, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';
import moment from 'moment';


import Card from '../../shared/card';
import { sortArray } from '../../utils';
import { RootState } from '../../store';
import { DELETE_AIRTIME, RETREIVE_AIRTIME } from '../../service';
import { Application, ApiResponse } from '../../models';
import { CloseAppModal, OpenAppModal } from '../../store/modal';
import AppModalComp from '../../shared/app-modal';
import DeleteComp from '../../shared/delete-comp/delete-comp';
import defaultImg from '../../assets/images/default.jpg';
import { INITIALIZE_AIRTIMES, REMOVE_AIRTIME } from '../../store/airtime';
import SortComp from '../../shared/sort-comp';
import ApplicationDetailsComp from './application-details';
import AppTable, { TableHeader } from '../../shared/app-table';
import DropdownComp, { DropdownList } from '../../shared/dropdown';
import { RETREIVE_APPLICATION } from '../../service/applications';
import { INITIALIZE_APPLICATIONS } from '../../store/application';

const ApplicationComp: FC = () => {
    const dispatch = useDispatch();
    const Applications: Application[] = useSelector((state: RootState) => state.applicationState.value);

    const [deleting, setDeleting] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [applicationsData, setApplicationsData] = useState<Application[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<Application | undefined>();
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
        { key: 'role', value: 'Role' },
        { key: 'certLevel', value: 'Qualification' },
        { key: 'status', value: 'Status' },
        { key: 'date', value: 'Date' },
        { key: 'actions', value: 'Actions' },
    ];

    const populateActions = (item: Application): DropdownList[] => {
        
        const tableActions: DropdownList[] = [
            { 
                label: 'View Detail', 
                disabled: false,
                action: () => {
                    setSelectedRecord(item)
                    openModal('view');
                }
            },
            { 
                label: 'Update Record', 
                disabled: false,
                action: () => {
                    setSelectedRecord(item)
                    openModal('update');
                }
            },
            { 
                label: 'Delete Record', 
                disabled: false,
                action: () => {
                    setSelectedRecord(item);
                    openModal('delete');
                }
            },
        ]
        return tableActions;
    }

    const retrieveAirtimes = () => {
        const query: string = `?sort=-title&populate=createdBy`;
        RETREIVE_APPLICATION(query)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            notify("success", message);
            setApplicationsData(payload);
            const mappedDate = payload.map((item: Application, idx: number) => {
                const actions = populateActions(item);
                return {
                    sn: idx + 1,
                    code: item?.code,
                    name: `${item?.firstName} ${item?.lastName}`,
                    certLeve: item?.certLevel,
                    role: item?.role || '--',
                    certLevel: item?.certLevel || '--',
                    status: item.status === 'ACCEPTED' ? 
                    <button className='bg-[#71DD37] text-white text-sm py-1 px-4 rounded-md'>{item.status}</button>
                    :
                    <button className='bg-[#7F7F80] text-white text-sm py-1 px-4 rounded-md'>{item.status}</button>,
                    date: moment(item?.createdAt).format("MM-DD-YYYY"),
                    actions: <DropdownComp dropdownList={actions} />
                }
            });
            setTableRows(mappedDate);
            dispatch(INITIALIZE_APPLICATIONS(payload));
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            notify("error", message);
        });
    };

    const sortData = (field: string) => {
        const sortedArray: any[] = sortArray(applicationsData, field);
        if (sortedArray.length > 0) {
          setApplicationsData(sortedArray);
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
            const filteredResults: Application[] = applicationsData.filter((item: Application) => Object.values(item).includes(searchQuery));
            setApplicationsData(filteredResults);
            setSearching(false);
        }else {
            setApplicationsData(applicationsData);
            setSearching(false);
        }
    }
    
    useEffect(() => {
        retrieveAirtimes();
    }, []);

    useEffect(() => {
        setApplicationsData(applicationsData);
    }, [Applications]);

    return (
        <>
            <div className="w-full">
                <Card type='lg'>
                    {/* Title section */}
                    <div id="title">
                        <div className="flex flex-col sm:justify-between md:justify-between lg:flex-row lg:justify-between w-full">
                            <div className='mb-8'>
                                <h3 className='text-[#134FE7] text-xl font-bold mb-1'>Applications Records Table</h3>
                                <p className='text-[#7F7F80] text-sm'>Displaying {applicationsData.length} of {applicationsData.length} Airtime Record(s)</p>
                            </div>

                            <div className='mb-8'>
                                <button 
                                    className='bg-[#134FE7] text-white py-2 px-4 rounded-md'
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
                                        className='bg-[#134FE7] text-white text-sm px-6 py-2 rounded-md'
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
                {/* {
                    modalMode === 'create' && <AirtimeForm />
                } */}
                {
                    modalMode === 'view' && <ApplicationDetailsComp data={selectedRecord} />
                }
                {/* {
                    modalMode === 'update' && <AirtimeUpdateForm airtime={selectedAirtime}  />
                } */}
                {/* {
                    modalMode === 'delete' && <DeleteComp id={selectedAirtime?.id} action={handleDeleteRecord} deleting={deleting} />
                } */}
            </AppModalComp>

        <ToastContainer />

        </>
    )
}

export default ApplicationComp;