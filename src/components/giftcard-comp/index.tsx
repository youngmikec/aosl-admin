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
import SortComp from '../../shared/sort-comp';
import { ApiResponse, GiftCard } from '../../models';
import AppModalComp from '../../shared/app-modal';
import DeleteComp from '../../shared/delete-comp/delete-comp';
import { CloseAppModal, OpenAppModal } from '../../store/modal';
import { DELETE_GIFTCARD, RETRIEVE_GIFTCARDS } from '../../service';
import { INITIALIZE_GIFTCARDS, REMOVE_GIFTCARD } from '../../store/giftcard';
import GiftcardForm from './giftcard-form';
import GiftcardUpdateForm from './giftcard-update-form';
import GiftcardDetailComp from './giftcard-detail';

const GiftcardComp = () => {
    const dispatch = useDispatch();
    const Giftcards: GiftCard[] = useSelector((state: RootState) => state.giftcardsState.value);

    const [deleting, setDeleting] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [giftcards, setGiftcards] = useState<GiftCard[]>([]);
    const [selectedGiftcard, setSelectedGiftcard] = useState<GiftCard | undefined>();
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

    const retrieveGiftcards = () => {
        const query: string = `?sort=-createdAt&populate=createdBy`;
        RETRIEVE_GIFTCARDS(query)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            notify("success", message);
            setGiftcards(payload);
            dispatch(INITIALIZE_GIFTCARDS(payload));
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            notify("error", message);
        });
    };

    const sortData = (field: string) => {
        const sortedArray: any[] = sortArray(giftcards, field);
        if (sortedArray.length > 0) {
          setGiftcards(sortedArray);
        }
    };

    const handleSearchQuery = () => {
        setSearching(true);
        if(searchQuery !== '') {
            const filteredResults: GiftCard[] = giftcards.filter((item: GiftCard) => Object.values(item).includes(searchQuery));
            setGiftcards(filteredResults);
            setSearching(false);
        }else {
            setGiftcards(Giftcards);
            setSearching(false);
        }
    }

    const openModal = (mode: string = 'create', id: string = '') => {
        setModalMode(mode);
        dispatch(OpenAppModal());
    }

    const handleDeleteRecord = (id: string) => {
        setDeleting(true);
        DELETE_GIFTCARD(id)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload, success } = res.data;
            if(success){
                setDeleting(false);
                notify("success", message);
                dispatch(REMOVE_GIFTCARD(payload.id));
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
        retrieveGiftcards();
    }, []);

    useEffect(() => {
        setGiftcards(Giftcards);
    }, [Giftcards]);

    return (
        <>
            <div className="w-full">
                <Card type='lg'>
                    {/* Title section */}
                    <div id="title">
                        <div className="flex justify-between w-full">
                            <div className='mb-8'>
                                <h3 className='text-[#8652A4] text-xl font-bold mb-1'>Giftcard Records Table</h3>
                                <p className='text-[#7F7F80] text-sm'>Displaying {giftcards.length} of {giftcards.length} Giftcard Record(s)</p>
                            </div>

                            <div className='mb-8'>
                                <button 
                                    className='bg-[#8652A4] text-white py-2 px-4 rounded-md'
                                    onClick={() => openModal('create')}
                                >
                                    create giftcard
                                </button>
                            </div>

                        </div>

                        <div className="flex justify-between">
                            <div>
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
                        </div>
                    </div>
                    {/* Title section */}

                    <div className='my-8'>
                        <div className='w-full overflow-x-scroll'>
                            <table className='table border w-full'>
                                <thead>
                                    <tr className='border-spacing-y-4'>
                                        <th className="text-left">Giftcard code</th>
                                        <th>Name</th>
                                        <th>Rate</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                
                                <tbody className='text-[#7F7F80]'>
                                    {
                                        giftcards.length > 0 ?
                                        giftcards.map((item: GiftCard) => {
                                            return <tr key={item.code}>
                                                <td className='text-left border-spacing-y-4'>{item?.code}</td>
                                                <td className="text-center py-3">{item?.name}</td>
                                                <td className="text-center py-3">{ item?.rate}</td>
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
                                                                    setSelectedGiftcard(item)
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
                                                                    setSelectedGiftcard(item)
                                                                    openModal('update');
                                                                }}
                                                            >
                                                                Update Giftcard
                                                            </span>
                                                        </li>

                                                        <li className="hover:bg-[#8652A4] hover:cursor-pointer pr-10 p-1 whitespace-no-wrap rounded-md hover:text-white text-sm md:text-base ">
                                                            <span 
                                                                className="items-left px-2 py-2"
                                                                onClick={() => {
                                                                setSelectedGiftcard(item)
                                                                openModal('delete')
                                                                }}
                                                            >
                                                                Delete Giftcard
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
                {
                    modalMode === 'create' && <GiftcardForm />
                }
                {
                    modalMode === 'view' && <GiftcardDetailComp giftcard={selectedGiftcard} />
                }
                {
                    modalMode === 'update' && <GiftcardUpdateForm giftcard={selectedGiftcard}  />
                }
                {
                    modalMode === 'delete' && <DeleteComp id={selectedGiftcard?.id} action={handleDeleteRecord} deleting={deleting} />
                }
            </AppModalComp>

        <ToastContainer />

        </>
    )
}

export default GiftcardComp;