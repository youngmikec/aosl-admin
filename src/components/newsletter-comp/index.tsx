import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';
import moment from 'moment';


import Card from '../../shared/card';
import { RootState } from '../../store';
import { sortArray } from '../../utils';
import { ApiResponse, Newsletter } from '../../models';
import AppModalComp from '../../shared/app-modal';
import { CloseAppModal, OpenAppModal } from '../../store/modal';
import SortComp from '../../shared/sort-comp';
import { BiEditAlt } from 'react-icons/bi';
import DeleteComp from '../../shared/delete-comp/delete-comp';
import { DELETE_NEWSLETTER, RETREIVE_NEWSLETTERS } from '../../service';
import { INITIALIZE_NEWSLETTERS, REMOVE_NEWSLETTER } from '../../store/newsletter';
import NewsletterForm from './newsletter-form';
import NewsletterUpdateForm from './newsletter-update-form';
import NewsletterDetailComp from './newsletter-details';
import AppTable, { TableHeader } from '../../shared/app-table';
import DropdownComp, { DropdownList } from '../../shared/dropdown';

const NewsletterComp = () => {
    const dispatch = useDispatch();
    const Newsletters: Newsletter[] = useSelector((state: RootState) => state.newsletterState.value);

    const [deleting, setDeleting] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
    const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | undefined>();
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
        { key: 'code', value: 'Code' },
        { key: 'title', value: 'Title' },
        { key: 'subject', value: 'Subject' },
        { key: 'status', value: 'Status' },
        { key: 'date', value: 'Date' },
        { key: 'actions', value: 'Actions' },
    ];

    const populateActions = (item: Newsletter): DropdownList[] => {
        console.log('user', item);
        const tableActions: DropdownList[] = [
            { 
                label: 'View Detail', 
                disabled: false,
                action: () => {
                    setSelectedNewsletter(item)
                    openModal('view');
                }
            },
            { 
                label: 'Update Newsletter', 
                disabled: false,
                action: () => {
                    setSelectedNewsletter(item)
                    openModal('update');
                }
            },
            { 
                label: 'Delete Newsletter', 
                disabled: false,
                action: () => {
                    setSelectedNewsletter(item);
                    openModal('delete');
                }
            },
        ]
        return tableActions;
    }

    const retrieveNewsletters = () => {
        const query: string = `?sort=-name&populate=createdBy`;
        RETREIVE_NEWSLETTERS(query)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            notify("success", message);
            setNewsletters(payload);
            const mappedDate = payload.map((item: Newsletter, idx: number) => {
                const actions = populateActions(item);
                return {
                    sn: idx + 1,
                    code: item?.code,
                    title: item?.title,
                    subject: item?.subject,
                    status: item.status === 'PUBLISHED' ? 
                    <button className='bg-[#71DD37] text-white text-sm py-1 px-4 rounded-md'>{item.status}</button>
                    :
                    <button className='bg-[#7F7F80] text-white text-sm py-1 px-4 rounded-md'>{item.status}</button>,
                    date: moment(item?.createdAt).format("MM-DD-YYYY"),
                    actions: <DropdownComp dropdownList={actions} />
                }
            });
            setTableRows(mappedDate);
            dispatch(INITIALIZE_NEWSLETTERS(payload));
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            notify("error", message);
        });
    };

    const sortData = (field: string) => {
        const sortedArray: any[] = sortArray(newsletters, field);
        if (sortedArray.length > 0) {
          setNewsletters(sortedArray);
        }
    };

    const openModal = (mode: string = 'create', id: string = '') => {
        setModalMode(mode);
        dispatch(OpenAppModal());
    }

    const handleDeleteRecord = (id: string) => {
        setDeleting(true);
        DELETE_NEWSLETTER(id)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload, success } = res.data;
            if(success){
                setDeleting(false);
                notify("success", message);
                dispatch(REMOVE_NEWSLETTER(payload.id));
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
            const filteredResults: Newsletter[] = newsletters.filter((item: Newsletter) => Object.values(item).includes(searchQuery));
            setNewsletters(filteredResults);
            setSearching(false);
        }else {
            setNewsletters(Newsletters);
            setSearching(false);
        }
    }
    
    useEffect(() => {
        retrieveNewsletters();
    }, []);

    useEffect(() => {
        setNewsletters(Newsletters);
    }, [Newsletters]);

    return (
        <>
            <div className="w-full">
                <Card type='lg'>
                    {/* Title section */}
                    <div id="title">
                        <div className="flex flex-col sm:justify-between md:justify-between lg:flex-row lg:justify-between w-full">
                            <div className='mb-8'>
                                <h3 className='text-[#8652A4] text-xl font-bold mb-1'>Newletter Records Table</h3>
                                <p className='text-[#7F7F80] text-sm'>Displaying {newsletters.length} of {newsletters.length} Newsletter Record(s)</p>
                            </div>

                            <div className='mb-8'>
                                <button 
                                    className='bg-[#8652A4] text-white py-2 px-4 rounded-md'
                                    onClick={() => openModal('create')}
                                >
                                    Create Newsletter
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
                    modalMode === 'create' && <NewsletterForm />
                }
                {
                    modalMode === 'view' && <NewsletterDetailComp newsletter={selectedNewsletter} />
                }
                {
                    modalMode === 'update' && <NewsletterUpdateForm newsletter={selectedNewsletter}  />
                }
                {
                    modalMode === 'delete' && <DeleteComp id={selectedNewsletter?.id} action={handleDeleteRecord} deleting={deleting} />
                }
            </AppModalComp>

        <ToastContainer />

        </>
    )
}

export default NewsletterComp;