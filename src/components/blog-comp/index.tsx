import React, { useState, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError, AxiosResponse } from 'axios';
import moment from 'moment';


import Card from '../../shared/card';
import { formatCurrency, sortArray } from '../../utils';
import { RootState } from '../../store';
import { ApiResponse, BlogPost } from '../../models';
import { CloseAppModal, OpenAppModal } from '../../store/modal';
import AppModalComp from '../../shared/app-modal';
import DeleteComp from '../../shared/delete-comp/delete-comp';
// import ApplicationDetailsComp from './application-details';
import AppTable, { TableHeader } from '../../shared/app-table';
import DropdownComp, { DropdownList } from '../../shared/dropdown';
import { DELETE_BLOG, } from '../../service/blogs';
import { REMOVE_BLOG } from '../../store/blog';
// import ApplicationForm from './application-form';
import { RETREIVE_BLOGS } from '../../service/blogs';
import { INITIALIZE_BLOGS } from '../../store/blog';
import BlogForm from './blog-form';

const BlogComp: FC = () => {
    const dispatch = useDispatch();
    const Blogs: BlogPost[] = useSelector((state: RootState) => state.blogState.value);

    const [loading, setLoading] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);
    const [blogsData, setBlogsData] = useState<BlogPost[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<BlogPost | undefined>();
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
        { key: 'title', value: 'title' },
        { key: 'category', value: 'Category' },
        { key: 'author', value: 'Author' },
        { key: 'status', value: 'Status' },
        { key: 'date', value: 'Created Date' },
        { key: 'actions', value: 'Actions' },
    ];

    const populateActions = (item: BlogPost): DropdownList[] => {
        
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

    const retrieveBlogs = () => {
        setLoading(true);
        const query: string = `?sort=-createdAt&populate=createdBy,author,comments,comment.replies`;
        RETREIVE_BLOGS(query)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { payload } = res.data;

            setLoading(false);
            setBlogsData(payload);
            const mappedData = payload.map((item: BlogPost, idx: number) => {
                const actions = populateActions(item);
                return {
                    sn: idx + 1,
                    code: item?.code,
                    title: item?.title.length > 0 ? item?.title.slice(0, 30).concat('...') : item.title,
                    category: item?.category,
                    author: `${item?.author?.firstName} ${item?.author?.lastName}`,
                    date: moment(item?.createdAt).format("Do MMMM YYYY"),
                    status: item.status === 'PUBLISHED' ? 
                    <button className='bg-[#71DD37] text-white text-sm py-1 px-4 rounded-md'>{item.status}</button>
                    :
                    <button className='bg-[#7F7F80] text-white text-sm py-1 px-4 rounded-md'>{item.status}</button>,
                    actions: <DropdownComp dropdownList={actions} />
                }
              });
            setTableRows(mappedData);
            dispatch(INITIALIZE_BLOGS(payload));
        })
        .catch((err: AxiosError<ApiResponse>) => {
            setLoading(false);
            if(err?.response?.data){
                notify('error', err.response?.data.message)
            }
        });
    };

    const sortData = (field: string) => {
        const sortedArray: any[] = sortArray(blogsData, field);
        if (sortedArray.length > 0) {
          setBlogsData(sortedArray);
        }
    };

    const openModal = (mode: string = 'create', id: string = '') => {
        setModalMode(mode);
        dispatch(OpenAppModal());
    }

    const handleDeleteRecord = (id: string) => {
        setDeleting(true);
        DELETE_BLOG(id)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload, success } = res.data;
            if(success){
                setDeleting(false);
                notify("success", message);
                dispatch(REMOVE_BLOG(payload.id));
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
        retrieveBlogs();
    }, []);

    // useEffect(() => {
    //     setBlogsData(blogsData);
    // }, []);

    return (
        <>
            <div className="w-full">
                <Card type='lg'>
                    {/* Title section */}
                    <div id="title">
                        <div className="flex flex-col sm:justify-between md:justify-between lg:flex-row lg:justify-between w-full">
                            <div className='mb-8'>
                                <h3 className='text-[#134FE7] text-xl font-bold mb-1'>Blog Records Table</h3>
                                <p className='text-[#7F7F80] text-sm'>Displaying {blogsData.length} of {blogsData.length} Blog Record(s)</p>
                            </div>

                            <div className='mb-8'>
                                <button 
                                    className='bg-[#134FE7] text-white py-2 px-4 rounded-md'
                                    onClick={() => openModal('create')}
                                >
                                    Create Blog
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
                    <BlogForm 
                        mode={modalMode} 
                        record={null} 
                        onSuccess={retrieveBlogs}
                    />
                }
                {/* {
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
                } */}
                {
                    modalMode === 'delete' && <DeleteComp id={selectedRecord?.id} action={handleDeleteRecord} deleting={deleting} />
                }
            </AppModalComp>

            <ToastContainer />

        </>
    )
}

export default BlogComp;