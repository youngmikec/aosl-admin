import React from 'react';
import { useDispatch } from 'react-redux';
import { CloseAppModal } from '../../store/modal';

type Props = {
    id?: string,
    deleting: boolean,
    action?: (id: string) => any
}

const DeleteComp = ({ id, action, deleting }: Props) => {
    const dispatch = useDispatch();
    // close modal
    const closeModal = () => {
        dispatch(CloseAppModal());
    }

    const handleDelete = () => {
        const recordId: string = id ? id : '';
        return action && action(recordId);
    }

    return (
        <>
            <div className='mx-auto w-full lg:w-4/12'>
                <h3 className='my-5 text-[#8c8c8c] font-bold text-center'>Proceed to delete record? </h3>

                <div className='flex justify-between'>
                    <div>
                        <button
                            className='bg-gray-50 text-gray-400 rounded-lg px-4 
                            py-2 hover:bg-gray-300 hover:text-gray-500'
                            onClick={() => closeModal()}
                        >
                            Cancel
                        </button>
                    </div>
                    <div>
                        <button
                            disabled={deleting}
                            onClick={() => handleDelete()}
                            className='bg-red-600 text-white rounded-lg px-4 
                            py-2 hover:bg-red-500'
                        >
                            { deleting ? 'Deleting...' : 'Delete' }
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteComp;