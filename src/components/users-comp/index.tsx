import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';
import moment from 'moment';

// icons
import { BsFillCaretDownFill } from 'react-icons/bs';

import Card from '../../shared/card';
import { sortArray } from "../../utils";
import { RootState } from '../../store';
import { ADD_TO_USERS, INITIALIZE_USERS, REMOVE_USER } from '../../store/users';
import { ApiResponse, User } from '../../models';
import AppModalComp from '../../shared/app-modal';
import DeleteComp from '../../shared/delete-comp/delete-comp';
import { CloseAppModal, OpenAppModal } from '../../store/modal';
import { DELETE_USER, RETRIEVE_USERS, UPDATE_USER_BY_ADMIN } from '../../service';
import { Link, useNavigate } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';
import SortComp from '../../shared/sort-comp';
import AppTable, { TableHeader } from '../../shared/app-table';
import DropdownComp, { DropdownList } from '../../shared/dropdown';

const UsersComp = () => {
    const usersState = useSelector((state: RootState) => state.usersState.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // states
    const [users, setUsers] = useState<User[]>([]);
    const [deleting, setDeleting] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentUser, setCurrentUser] = useState<User | undefined>();
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
        { key: 'fullName', value: 'Full Name' },
        { key: 'email', value: 'Email' },
        { key: 'type', value: 'Type' },
        { key: 'status', value: 'Status' },
        { key: 'date', value: 'Date' },
        { key: 'actions', value: 'Actions' },
    ];


    const populateActions = (item: User): DropdownList[] => {
        
        const tableActions: DropdownList[] = [
            { 
                label: 'Upgrade to Admin', 
                disabled: item.userType == "ADMIN" ? true : false,
                action: () => {
                    handleUserUpgrade(item.id, "ADMIN")
                }
            },
            { 
                label: 'Downgrade to User', 
                disabled: item.userType == "USER" ? true : false,
                action: () => {
                    handleUserUpgrade(item.id, "USER")
                }
            },
            { 
                label: 'View Detail', 
                disabled: false,
                action: () => {
                    navigate(`/users/${item.id}`)
                }
            },
            { 
                label: 'Delete User', 
                disabled: false,
                action: () => {
                    setCurrentUser(item)
                    openModal()
                }
            },
        ];
        return tableActions;
    }

    const mapUserData = (data: User[]) => {
        const mappedData = data.map((item: User, idx: number) => {
            const actions = populateActions(item);
            return {
                sn: idx + 1,
                fullName: `${item?.firstName} ${item?.lastName}`,
                email: item?.email,
                type: item?.userType,
                status: item?.isVerified ? 'Verified' : 'Not Verified',
                date: moment(item?.createdAt).format("MM-DD-YYYY"),
                actions: <DropdownComp dropdownList={actions} />
            }
        });
        return mappedData;
    }


    const retrieveUsers = () => {
        RETRIEVE_USERS('?sort=-createdAt')
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            setUsers(payload);
            setTableRows(mapUserData(payload));
            dispatch(INITIALIZE_USERS(payload));
        })
        .catch((err) => {
            const { message } = err.response.data;
            notify("error", message);
        });
    };

    const handleUserUpgrade = (id: string, role: string) => {
        const data = { userType: role };
        UPDATE_USER_BY_ADMIN(id, data)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message } = res.data;
            notify("success", message);
            retrieveUsers();
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            notify("error", message);
        });
    };


    const openModal = () => {
        dispatch(OpenAppModal());
    }

    const handleDeleteRecord = (id: string) => {
        setDeleting(true);
        DELETE_USER(id)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload, success } = res.data;
            if(success){
                setDeleting(false);
                notify("success", message);
                dispatch(REMOVE_USER(payload.id));
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
            const filteredResults: User[] = users.filter((item: User) => Object.values(item).includes(searchQuery));
            setUsers(filteredResults);
            setSearching(false);
        }else {
            setUsers(usersState);
            setSearching(false);
        }
    }

    useEffect(() => {
        (usersState.length > 0) ? setTableRows(mapUserData(usersState)) : retrieveUsers();
    }, [usersState]);

    return (
        <>
            <div className="w-full">
                <Card type='lg'>
                    {/* Title section */}
                    <div id="title">
                        <div className='mb-8'>
                            <h3 className='text-[#134FE7] text-xl font-bold mb-1'>Users Record Table</h3>
                            <p className='text-[#7F7F80] text-sm'>Displaying {users.length} of {users.length} User Record(s)</p>
                        </div>
                    </div>
                    {/* Title section */}
                    <AppTable tableHeaders={tableHeaders} tableRows={tableRows} />
                </Card>
            </div>

            <AppModalComp title=''>
                <DeleteComp id={currentUser?.id} action={handleDeleteRecord} deleting={deleting} />
            </AppModalComp>
            <ToastContainer />
        </>
    )
}

export default UsersComp;