import React, { useState, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';
import moment from 'moment';


import Card from '../../shared/card';
import { sortArray } from '../../utils';
import { RootState } from '../../store';
import { Application, ApiResponse } from '../../models';
import { CloseAppModal, OpenAppModal } from '../../store/modal';
import AppModalComp from '../../shared/app-modal';
import DeleteComp from '../../shared/delete-comp/delete-comp';
import ApplicationDetailsComp from './application-details';
import AppTable, { TableHeader } from '../../shared/app-table';
import DropdownComp, { DropdownList } from '../../shared/dropdown';
import { DELETE_APPLICATION, RETREIVE_APPLICATION } from '../../service/applications';
import { INITIALIZE_APPLICATIONS, REMOVE_APPLICATION } from '../../store/application';
import ApplicationForm from './application-form';

const ApplicationComp: FC = () => {
    const dispatch = useDispatch();
    const Applications: Application[] = useSelector((state: RootState) => state.applicationState.value);

    const [deleting, setDeleting] = useState<boolean>(false);
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

    const retrieveApplications = () => {
        const query: string = `?sort=-createdAt&populate=createdBy`;
        RETREIVE_APPLICATION(query)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            if(payload.length < 1){
                notify("success", message);
            }
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
        DELETE_APPLICATION(id)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload, success } = res.data;
            if(success){
                setDeleting(false);
                notify("success", message);
                dispatch(REMOVE_APPLICATION(payload.id));
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
        retrieveApplications();
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
                                <p className='text-[#7F7F80] text-sm'>Displaying {applicationsData.length} of {applicationsData.length} Application Record(s)</p>
                            </div>

                            <div className='mb-8'>
                                <button 
                                    className='bg-[#134FE7] text-white py-2 px-4 rounded-md'
                                    onClick={() => openModal('create')}
                                >
                                    Create Application
                                </button>
                            </div>

                        </div>

                    </div>
                    {/* Title section */}

                    <AppTable tableHeaders={tableHeaders} tableRows={tableRows} />
                
                </Card>
            </div>

            <AppModalComp title=''>
                {
                    modalMode === 'create' && 
                    <ApplicationForm 
                        jobId={''} 
                        mode={modalMode} 
                        record={null} 
                        onSuccess={retrieveApplications}
                    />
                }
                {
                    modalMode === 'view' && <ApplicationDetailsComp data={selectedRecord} />
                }
                {
                    modalMode === 'update' && 
                    <ApplicationForm 
                        mode={modalMode} 
                        jobId={selectedRecord ? selectedRecord?.id : ''} 
                        record={selectedRecord ? selectedRecord : null}  
                        onSuccess={retrieveApplications}
                    />
                }
                {
                    modalMode === 'delete' && <DeleteComp id={selectedRecord?.id} action={handleDeleteRecord} deleting={deleting} />
                }
            </AppModalComp>

            <ToastContainer />

        </>
    )
}

export default ApplicationComp;