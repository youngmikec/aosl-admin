import { useDispatch, useSelector } from "react-redux";
import { CloseLogoutModal } from "../../store/modal/logout-modal";
import { RootState } from "../../store";

const LogoutComp = () => {
    const dispatch = useDispatch();
    const displayModal: boolean = useSelector((state: RootState) => state.logoutModal.displayModal);
    // close modal
    const closeModal = () => {
        dispatch(CloseLogoutModal());
    }

    const handleLogout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("clientId");
        localStorage.removeItem("clientID");
        localStorage.removeItem("clientD");
        localStorage.removeItem("clientToken");
        window.location.href = "/login";
    };

    return (
        <>
            {
                displayModal &&
                <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#4242428f] w-full h-full z-[150] overflow-scroll">
                    <div className='my-12'>

                        <div className="bg-white p-2 lg:p-4 rounded-2xl mx-auto w-11/12 sm:w-11/12 md:w-10/12 lg:w-7/12">
                            <div className='flex justify-end mb-8'>
                                <div className="relative bg-white rounded-lg shadow">
                                    <button onClick={() => closeModal()} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" data-modal-hide="popup-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                            </div>

                            {/* content */}
                            <div className='min-h-52'>
                                <div className="p-6 text-center my-8 z-[100]">
                                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                        <h3 className="mb-5 text-lg font-normal text-gray-500">Are you sure you want to log out?</h3>
                                        <button 
                                            data-modal-hide="popup-modal" 
                                            type="button"
                                            onClick={() => handleLogout()}
                                            className="
                                                text-white bg-red-600 hover:bg-red-800 focus:ring-4 
                                                focus:outline-none focus:ring-red-300 font-medium rounded-lg 
                                                text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                        >
                                            Log out
                                        </button>
                                        <button 
                                            data-modal-hide="popup-modal" 
                                            type="button"
                                            onClick={() => closeModal()}
                                            className="
                                                text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none 
                                                focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 
                                                hover:text-gray-900 focus:z-10"
                                            >No, cancel</button>
                                    </div>
                                </div>
                            {/* content */}
                        </div>
                        
                    </div>
                </div>              
            }
        </>
    )
}

export default LogoutComp;