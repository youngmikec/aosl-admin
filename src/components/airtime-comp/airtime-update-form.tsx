import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';

import './style.css';
import { Airtime, ApiResponse } from '../../models';
import { UPDATE_AIRTIME } from '../../service';
import { UPDATE_AIRTIME_STATE } from '../../store/airtime';

type Props = {
    airtime?: Airtime
}

const AirtimeUpdateForm = ({ airtime }: Props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const [networkImage, setNetworkImage] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [name, setName] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [shortName, setShortName] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [rate, setRate] = useState<{value: number, error: boolean } | any>({value: 0, error: false});
    const [txnNetwork, setTxnNetwork] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [txnNetworkNumber, setTxnNetworkNumber] = useState<{value: string, error: boolean } | any>({value: '', error: false});

    const fileRef = useRef<HTMLInputElement>(null);

    const openFile = () => {
        return fileRef.current?.click();
    }

    const handleFileRead = async (event: any) => {
        const file = event.target.files[0];
        const base64: any = await convertBase64(file);
        setNetworkImage({...networkImage, value: base64});
    }

    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
            resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

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

    const clearFormStates = () => {
        setNetworkImage({value: '', error: false});
        setName({value: '', error: false});
        setShortName({value: '', error: false});
        setRate({value: 0, error: false});
        setTxnNetwork({value: '', error: false});
        setTxnNetworkNumber({value: '', error: false});
    }

    const handleSubmit = () => {
        setLoading(true);
        const data = { 
            name: name.value,
            shortName: shortName.value,
            rate: rate.value,
            networkImage: networkImage.value,
            txnNetwork: txnNetwork.value,
            txnNetworkNumber: txnNetworkNumber.value,
        };
        const id: string = airtime?.id ? airtime.id : '';
        UPDATE_AIRTIME(id, data)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            setLoading(false);
            notify("success", message);
            dispatch(UPDATE_AIRTIME_STATE(payload));
            clearFormStates();
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            notify("error", message);
            setLoading(false);
        });  
      
    };

    useEffect(() => {
        setNetworkImage({value: airtime?.networkImage, error: false});
        setName({value: airtime?.name, error: false});
        setShortName({value: airtime?.shortName, error: false});
        setRate({value: airtime?.rate, error: false});
        setTxnNetwork({value: airtime?.txnNetwork, error: false});
        setTxnNetworkNumber({value: airtime?.txnNetworkNumber, error: false});
    }, [])


    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:space-x-3'>
                <div>
                    <div
                        className={`border-2 rounded-md my-3 h-60 w-full flex justify-center ${
                            networkImage.error ? 'error-border' : 'input-border'
                        } px-4 py-2 `}
                    >
                        {
                            networkImage.value ? 
                            <img src={networkImage?.value} alt="uploaded" /> :
                            <button className='text-center text-[#7F7F80]' onClick={() => openFile()}>
                                + <br /> Choose file
                            </button>
                        }
                        <input 
                            type="file" 
                            className='hidden'
                            ref={fileRef}
                            onChange={(e) => handleFileRead(e)}
                        />
                    </div>
                </div>

                <div>
                    <div id='form'>

                        <div className="my-3">
                            <label htmlFor="name" className="text-[#BFBFBF] text-sm block">
                                Airtime Name*
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={name.value}
                                onChange={(e) =>
                                    setName({ ...name, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    name.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="shortName" className="text-[#BFBFBF] text-sm block">
                                Airtime short Name*
                            </label>
                            <input
                                type="text"
                                name="shortName"
                                value={shortName.value}
                                onChange={(e) =>
                                    setShortName({ ...shortName, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    shortName.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="rate" className="text-[#BFBFBF] text-sm block">
                                Rate In percentage (%)*
                            </label>
                            <input
                                type="number"
                                name="rate"
                                min={0}
                                value={rate.value}
                                onChange={(e) =>
                                    setRate({ ...rate, value: parseInt(e.target.value) })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    rate.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="txnNetwork" className="text-[#BFBFBF] text-sm block">
                                Transaction Network*
                            </label>
                            <input
                                type="text"
                                name="txnNetwork"
                                value={txnNetwork.value}
                                onChange={(e) =>
                                    setTxnNetwork({ ...txnNetwork, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    txnNetwork.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="txnNetworkNumber" className="text-[#BFBFBF] text-sm block">
                                Transaction Network Number*
                            </label>
                            <input
                                type="text"
                                name="txnNetworkNumber"
                                value={txnNetworkNumber.value}
                                onChange={(e) =>
                                    setTxnNetworkNumber({ ...txnNetworkNumber, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    txnNetworkNumber.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3 text-center">
                            <button
                                onClick={() => handleSubmit()}
                                className="bg-[#8652A4] text-white py-1 px-10 rounded-2xl"
                            >
                                {loading ? "Processing..." : "update"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default AirtimeUpdateForm;