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

const NewsletterComp = () => {
    const dispatch = useDispatch();
    const Newsletters: Newsletter[] = useSelector((state: RootState) => state.newsletterState.value);

    const [deleting, setDeleting] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
    const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | undefined>();
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

    const retrieveNewsletters = () => {
        const query: string = `?sort=-name&populate=createdBy`;
        RETREIVE_NEWSLETTERS(query)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            notify("success", message);
            setNewsletters(payload);
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
        setNewsletters(Newsletters)
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
                                    create Newsletter
                                </button>
                            </div>

                        </div>

                        <div className="flex flex-col sm:justify-between md:justify-between lg:flex-row lg:justify-between w-full">
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
                        </div>
                    </div>
                    {/* Title section */}

                    <div className='my-8 w-full overflow-x-scroll'>
                        <table className='table border w-full'>
                            <thead>
                                <tr className='border-spacing-y-4'>
                                    <th className="text-left">code</th>
                                    <th>Title</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                            <tbody className='text-[#7F7F80]'>
                                {
                                    newsletters.length > 0 ?
                                    newsletters.map((item: Newsletter) => {
                                        return <tr key={item.code}>
                                            <td className='text-left border-spacing-y-4'>{item?.code}</td>
                                            <td className="text-center py-3">{item?.title}</td>
                                            <td className="text-center py-3">{ item?.subject}</td>
                                            <td className="text-center py-3">
                                                { item?.message }
                                            </td>
                                            <td className="text-center py-3">
                                                {
                                                    item.status === 'PUBLISHED' ? 
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
                                                                setSelectedNewsletter(item)
                                                                openModal('view');
                                                            }}
                                                        >
                                                            View Detail
                                                        </span>
                                                    </li>

                                                    <li className="hover:bg-[#8652A4] hover:cursor-pointer pr-10 p-1 whitespace-no-wrap rounded-md hover:text-white text-sm md:text-base ">
                                                        <span 
                                                            className="items-left px-2 py-2"
                                                            onClick={() => {
                                                                setSelectedNewsletter(item)
                                                                openModal('update');
                                                            }}
                                                        >
                                                            Update Newsletter
                                                        </span>
                                                    </li>

                                                    <li className="hover:bg-[#8652A4] hover:cursor-pointer pr-10 p-1 whitespace-no-wrap rounded-md hover:text-white text-sm md:text-base ">
                                                        <span 
                                                            className="items-left px-2 py-2"
                                                            onClick={() => {
                                                            setSelectedNewsletter(item)
                                                            openModal('delete')
                                                            }}
                                                        >
                                                            Delete Newsletter
                                                        </span>
                                                    </li>
                                                </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    }) : 
                                        <tr>
                                            <td colSpan={7} className="text-center py-3">No Newsletter Record available</td>
                                        </tr>
                                }
                                
                                
                            </tbody>
                        </table>
                    </div>
                
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