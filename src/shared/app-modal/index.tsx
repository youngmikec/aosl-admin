import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';


import { CloseAppModal } from '../../store/modal';

type Props = {
    children: ReactNode,
    title: string;
}

const AppModalComp = ({ children, title }: Props) => {
    const dispatch = useDispatch();
    const displayModal: boolean = useSelector((state: RootState) => state.appModal.displayModal);
    // close modal
    const closeModal = () => {
        dispatch(CloseAppModal());
    }

    return (
        <>  
            {
                displayModal &&
                <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#4242428f] w-full h-full z-30 overflow-scroll">
                    <div className='my-8'>

                        <div className="bg-white p-4 rounded-2xl mx-auto w-11/12 sm:w-11/12 md:w-10/12 lg:w-7/12">
                            <div className='flex justify-between'>
                                <div>
                                    <h3>{ title }</h3>
                                </div>
                                <div>
                                    <span className='cursor-pointer' onClick={() => closeModal()}>X</span>
                                </div>
                            </div>

                            {/* content */}
                            {
                                children
                            }
                        </div>
                        
                    </div>
                </div>
            }
        </>
    )
}

export default AppModalComp;