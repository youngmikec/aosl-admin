import React, { useState, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';
import moment from 'moment';


import Card from '../../shared/card';
import { sortArray } from '../../utils';
import { RootState } from '../../store';
import { ApiResponse, Job, JobStatus } from '../../models';
import { CloseAppModal, OpenAppModal } from '../../store/modal';
import AppModalComp from '../../shared/app-modal';
import DeleteComp from '../../shared/delete-comp/delete-comp';
import defaultImg from '../../assets/images/default.jpg';
import SortComp from '../../shared/sort-comp';
import JobsDetailsComp from './jobs-details';
import AppTable, { TableHeader } from '../../shared/app-table';
import DropdownComp, { DropdownList } from '../../shared/dropdown';
import { INITIALIZE_APPLICATIONS } from '../../store/application';
import { DELETE_JOBS, RETREIVE_JOBS } from '../../service/jobs';
import { REMOVE_JOB } from '../../store/jobs-training';
import JobForm from './job-form';

const JobsComp: FC = () => {
    const dispatch = useDispatch();
    const Jobs: Job[] = useSelector((state: RootState) => state.jobState.value);

    const [deleting, setDeleting] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [jobsData, setJobssData] = useState<Job[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<Job | undefined>();
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
      { key: 'code', value: 'Job/Training Code' },
      { key: 'title', value: 'Title' },
      { key: 'type', value: 'Type' },
      { key: 'company', value: 'Company' },
      { key: 'status', value: 'Status' },
      { key: 'date', value: 'Date' },
      { key: 'actions', value: 'Actions' },
    ];

    const populateActions = (item: Job): DropdownList[] => {
        
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

    const retrieveJobs = () => {
        const query: string = `?sort=-createdAt&populate=createdBy`;
        RETREIVE_JOBS(query)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            notify("success", message);
            setJobssData(payload);
            const mappedDate = payload.map((item: Job, idx: number) => {
                const actions = populateActions(item);
                return {
                  sn: idx + 1,
                  code: item?.code,
                  title: item?.title,
                  type: item?.type,
                  company: item?.companyName || '--',
                  status: item.status === JobStatus.OPEN ? 
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
        const sortedArray: any[] = sortArray(jobsData, field);
        if (sortedArray.length > 0) {
          setJobssData(sortedArray);
        }
    };

    const openModal = (mode: string = 'create', id: string = '') => {
        setModalMode(mode);
        dispatch(OpenAppModal());
    }

    const handleDeleteRecord = (id: string) => {
        setDeleting(true);
        DELETE_JOBS(id)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload, success } = res.data;
            if(success){
                setDeleting(false);
                notify("success", message);
                dispatch(REMOVE_JOB(payload.id));
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
            const filteredResults: Job[] = jobsData.filter((item: Job) => Object.values(item).includes(searchQuery));
            setJobssData(filteredResults);
            setSearching(false);
        }else {
            setJobssData(jobsData);
            setSearching(false);
        }
    }
    
    useEffect(() => {
        retrieveJobs();
    }, []);

    useEffect(() => {
        setJobssData(jobsData);
    }, [Jobs]);

    return (
        <>
            <div className="w-full">
                <Card type='lg'>
                    {/* Title section */}
                    <div id="title">
                      <div className="flex flex-col sm:justify-between md:justify-between lg:flex-row lg:justify-between w-full">
                          <div className='mb-8'>
                              <h3 className='text-[#134FE7] text-xl font-bold mb-1'>Jobs/Traning Records Table</h3>
                              <p className='text-[#7F7F80] text-sm'>Displaying {jobsData.length} of {jobsData.length} Job/Training Record(s)</p>
                          </div>

                          <div className='mb-8'>
                              <button 
                                  className='bg-[#134FE7] text-white py-2 px-4 rounded-md'
                                  onClick={() => openModal('create')}
                              >
                                  Create Job/Training
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
                    modalMode === 'create' && <JobForm mode={modalMode} />
                }
                {
                    modalMode === 'view' && <JobsDetailsComp data={selectedRecord} />
                }
                {
                    modalMode === 'update' && <JobForm mode={modalMode} record={selectedRecord} />
                }
                {
                    modalMode === 'delete' && <DeleteComp id={selectedRecord?.id} action={handleDeleteRecord} deleting={deleting} />
                }
            </AppModalComp>

        <ToastContainer />

        </>
    )
}

export default JobsComp;