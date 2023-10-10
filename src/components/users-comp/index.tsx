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
import { ADD_TO_USERS, REMOVE_USER } from '../../store/users';
import { ApiResponse, User } from '../../models';
import AppModalComp from '../../shared/app-modal';
import DeleteComp from '../../shared/delete-comp/delete-comp';
import { CloseAppModal, OpenAppModal } from '../../store/modal';
import { DELETE_USER, RETRIEVE_USERS, UPDATE_USER_BY_ADMIN } from '../../service';
import { Link } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';
import SortComp from '../../shared/sort-comp';

const UsersComp = () => {
    const usersState = useSelector((state: RootState) => state.usersState.value);

    // states
    const [users, setUsers] = useState<User[]>([]);
    const [deleting, setDeleting] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentUser, setCurrentUser] = useState<User | undefined>();

    const dispatch = useDispatch()
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

    const retrieveUsers = () => {
        RETRIEVE_USERS()
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            notify("success", message);
            console.log('payload', payload);
            setUsers(payload);
            dispatch(ADD_TO_USERS(payload));
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

    const sortData = (field: string) => {
        const sortedArray: any[] = sortArray(users, field);
        if (sortedArray.length > 0) {
            setUsers(sortedArray);
        }
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
        retrieveUsers();
    }, []);

    return (
        <>
            <div className="w-full">
                <Card type='lg'>
                    {/* Title section */}
                    <div id="title">
                        <div className='mb-8'>
                            <h3 className='text-[#8652A4] text-xl font-bold mb-1'>Users Record Table</h3>
                            <p className='text-[#7F7F80] text-sm'>Displaying {users.length} of {users.length} User Record(s)</p>
                        </div>

                        <div className="flex flex-col sm:justify-between md:justify-between lg:flex-row lg:justify-between w-full">
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
                        </div>
                    </div>
                    {/* Title section */}

                    <div className='my-8'>
                        <div className='w-full overflow-x-scroll'>
                            <table className='table border w-full'>
                                <thead>
                                    <tr className='border-spacing-y-4'>
                                        <th className="text-left">Full Name</th>
                                        <th>Email address</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='text-[#7F7F80]'>
                                    {
                                        users.length > 0 ? 
                                        users.map((item: User, idx: number) => {
                                            return <tr key={idx} className="my-4">
                                                <td className='text-left border-spacing-y-4'>{item?.firstName}</td>
                                                <td className="text-center py-3">{item?.email}</td>
                                                <td className="text-center py-3">{item?.userType}</td>
                                                <td className="text-center py-3">{item?.isVerified ? 'Verified' : 'Not Verified'}</td>
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
                                                        {item.userType === "USER" && (
                                                        <li className="hover:bg-[#8652A4] hover:cursor-pointer pr-10 p-1 whitespace-no-wrap hover:text-white rounded-md text-sm md:text-base ">
                                                            <span
                                                            className="items-left px-2 py-3"
                                                            onClick={() =>
                                                                handleUserUpgrade(item._id, "ADMIN")
                                                            }
                                                            >
                                                                Upgrade to Admin
                                                            </span>
                                                        </li>
                                                        )}

                                                        {item.userType === "ADMIN" && (
                                                        <li className="hover:bg-[#8652A4] hover:cursor-pointer pr-10 p-1 whitespace-no-wrap rounded-md hover:text-white text-sm md:text-base ">
                                                            <span
                                                            className="items-left px-2 py-2"
                                                            onClick={() =>
                                                                handleUserUpgrade(item._id, "USER")
                                                            }
                                                            >
                                                                Downgrade to User
                                                            </span>
                                                        </li>
                                                        )}

                                                        <li className="hover:bg-[#8652A4] hover:cursor-pointer pr-10 p-1 whitespace-no-wrap rounded-md hover:text-white text-sm md:text-base ">
                                                        <span className="items-left px-2 py-2">
                                                            <Link to={`/users/${item._id}`}>View Detail</Link>
                                                        </span>
                                                        </li>

                                                        <li className="hover:bg-[#8652A4] hover:cursor-pointer pr-10 p-1 whitespace-no-wrap rounded-md hover:text-white text-sm md:text-base ">
                                                        <span 
                                                            className="items-left px-2 py-2"
                                                            onClick={() => {
                                                            setCurrentUser(item)
                                                            openModal()
                                                            }}
                                                        >
                                                            Delete User
                                                        </span>
                                                        </li>
                                                    </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        }) :
                                        <tr>
                                            <td colSpan={5} className="text-center py-3">No Users available</td>
                                        </tr>
                                    }
                                    
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
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