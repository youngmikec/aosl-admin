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
import AppTable, { TableHeader } from '../../shared/app-table';
import DropdownComp, { DropdownList } from '../../shared/dropdown';

const GiftcardComp = () => {
    const dispatch = useDispatch();
    const Giftcards: GiftCard[] = useSelector((state: RootState) => state.giftcardsState.value);

    const [deleting, setDeleting] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [giftcards, setGiftcards] = useState<GiftCard[]>([]);
    const [selectedGiftcard, setSelectedGiftcard] = useState<GiftCard | undefined>();
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
        { key: 'code', value: 'Giftcard Code' },
        { key: 'name', value: 'Name' },
        { key: 'rate', value: 'Rate' },
        { key: 'status', value: 'Status' },
        { key: 'date', value: 'Date' },
        { key: 'actions', value: 'Actions' },
    ];

    const populateActions = (item: GiftCard): DropdownList[] => {
        
        const tableActions: DropdownList[] = [
            { 
                label: 'View Detail', 
                disabled: false,
                action: () => {
                    setSelectedGiftcard(item)
                    openModal('view');
                }
            },
            { 
                label: 'Update Giftcard', 
                disabled: false,
                action: () => {
                    setSelectedGiftcard(item)
                    openModal('update');
                }
            },
            { 
                label: 'Delete Giftcard', 
                disabled: false,
                action: () => {
                    setSelectedGiftcard(item);
                    openModal('delete');
                }
            },
        ]
        return tableActions;
    }

    const retrieveGiftcards = () => {
        const query: string = `?sort=-createdAt&populate=createdBy`;
        RETRIEVE_GIFTCARDS(query)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            notify("success", message);
            setGiftcards(payload);
            const mappedDate = payload.map((item: GiftCard, idx: number) => {
                const actions = populateActions(item);
                return {
                    sn: idx + 1,
                    code: item?.code,
                    name: item?.name,
                    rate: item?.rate,
                    status: item.status === 'ACTIVE' ? 
                    <button className='bg-[#71DD37] text-white text-sm py-1 px-4 rounded-md'>{item.status}</button>
                    :
                    <button className='bg-[#7F7F80] text-white text-sm py-1 px-4 rounded-md'>{item.status}</button>,
                    date: moment(item?.createdAt).format("MM-DD-YYYY"),
                    actions: <DropdownComp dropdownList={actions} />
                }
            });
            setTableRows(mappedDate);
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
                        <div className="flex flex-col sm:justify-between md:justify-between lg:flex-row lg:justify-between w-full">
                            <div className='mb-8'>
                                <h3 className='text-[#134FE7] text-xl font-bold mb-1'>Giftcard Records Table</h3>
                                <p className='text-[#7F7F80] text-sm'>Displaying {giftcards.length} of {giftcards.length} Giftcard Record(s)</p>
                            </div>

                            <div className='mb-8'>
                                <button 
                                    className='bg-[#134FE7] text-white py-2 px-4 rounded-md'
                                    onClick={() => openModal('create')}
                                >
                                    Create Giftcard
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