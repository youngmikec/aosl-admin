import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';

import './style.css';
import { ApiResponse, GiftCard } from '../../models';
import { UPDATE_GIFTCARD } from '../../service';
import { UPDATE_GIFTCARD_STATE } from '../../store/giftcard';

type Props = {
    giftcard?: GiftCard
}

const GiftcardUpdateForm = ({ giftcard }: Props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const [giftcardImage, setGiftcardImage] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [barcode, setBarcode] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [name, setName] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [type, setType] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [rate, setRate] = useState<{value: number, error: boolean } | any>({value: 0, error: false});
    const [walletAddress, setWalletAddress] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [bankName, setBankName] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [accountName, setAccountName] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [accountNumber, setAccountNumber] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [exchangePlatform, setExchangePlatform] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [status, setStatus] = useState<{value: string, error: boolean } | any>({value: '', error: false});

    const fileRef = useRef<HTMLInputElement>(null);

    const openFile = () => {
        return fileRef.current?.click();
    }

    const removeImage = () => {
        setGiftcardImage({value: '', error: false});
    }

    const handleFileRead = async (event: any) => {
        const file = event.target.files[0];
        const base64: any = await convertBase64(file);
        setGiftcardImage({...giftcardImage, value: base64});
    }
    const handleBarcodeFileRead = async (event: any) => {
        const file = event.target.files[0];
        const base64: any = await convertBase64(file);
        setBarcode({...barcode, value: base64});
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
        setGiftcardImage({value: '', error: false});
        setBarcode({value: '', error: false});
        setName({value: '', error: false});
        setType({value: '', error: false});
        setRate({value: 0, error: false});
        setStatus({value: '', error: false});
        setBankName({value: '', error: false});
        setAccountName({value: '', error: false});
        setAccountNumber({value: '', error: false});
        setExchangePlatform({value: '', error: false});
    }

    const handleSubmit = () => {
        setLoading(true);
        let data = { 
            name: name.value,
            rate: rate.value,
            type: type.value,
            status: status.value,
            walletAddress: walletAddress.value,
            bankName: bankName.value,
            accountName: accountName.value,
            accountNumber: accountNumber.value,
            giftcardImage: giftcardImage.value,
            exchangePlatform: exchangePlatform.value,
        };
        
      const id: string = giftcard?.id ? giftcard.id : '';
      UPDATE_GIFTCARD(id, data)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            setLoading(false);
            notify("success", message);
            dispatch(UPDATE_GIFTCARD_STATE(payload));
            clearFormStates();
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            notify("error", message);
            setLoading(false);
        });
         
    };

    useEffect(() => {
        setGiftcardImage({value: giftcard?.giftcardImage, error: false});
        setName({value: giftcard?.name, error: false});
        setType({value: giftcard?.type, error: false});
        setRate({value: giftcard?.rate, error: false});
        setStatus({value: giftcard?.status, error: false});
        setBankName({value: giftcard?.bankName, error: false});
        setAccountName({value: giftcard?.accountName, error: false});
        setAccountNumber({value: giftcard?.accountNumber, error: false});
        setExchangePlatform({value: giftcard?.exchangePlatform, error: false});
    }, [])


    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:space-x-3'>
                <div>
                    <div className="my-3">
                        <label htmlFor="shortName" className="text-[#BFBFBF] text-sm block">
                            Giftcard image
                        </label>
                        <div
                            className={`border-2 rounded-md my-3 h-60 w-full flex justify-center ${
                                giftcardImage.error ? 'error-border' : 'input-border'
                            } px-4 py-2 relative`}
                        >
                            {giftcardImage.value && <span onClick={() => removeImage()} className='absolute top-2 cursor-pointer right-3 z-10'>X</span>}
                            {
                                giftcardImage.value ? 
                                <img src={giftcardImage?.value} width="30%" className='cursor-pointer' alt="uploaded" onClick={() => openFile()} /> :
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
                    
                    {/* <div className="my-3">
                        <label htmlFor="shortName" className="text-[#BFBFBF] text-sm block">
                            Wallet QR code
                        </label>
                        <div
                            className={`border-2 rounded-md my-3 h-60 w-full flex justify-center ${
                                barcode.error ? 'error-border' : 'input-border'
                            } px-4 py-2 `}
                        >
                            {
                                barcode.value ? 
                                <img src={barcode?.value} alt="uploaded" /> :
                                <button className='text-center text-[#7F7F80]' onClick={() => openFile()}>
                                    + <br /> Choose file
                                </button>
                            }
                            <input 
                                type="file" 
                                className='hidden'
                                ref={fileRef}
                                onChange={(e) => handleBarcodeFileRead(e)}
                            />
                        </div>
                    </div> */}
                </div>

                <div>
                    <div id='form'>

                        <div className="my-3">
                            <label htmlFor="name" className="text-[#BFBFBF] text-sm block">
                                Gift card Name*
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
                            <label htmlFor="rate" className="text-[#BFBFBF] text-sm block">
                                Rate in Usd*
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
                            <label htmlFor="rate" className="text-[#BFBFBF] text-sm block">
                                Card Type*
                            </label>
                            <select 
                                name="type" 
                                id="type"
                                onChange={(e) => setType({ ...type, value: e.target.value })}
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    type.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            >
                                <option value="">card type</option>
                                <option value="PHYSICAL">Physical card</option>
                                <option value="ECODE">Ecode</option>
                            </select>
                        </div>

                        <div className="my-3">
                            <label htmlFor="walletAddress" className="text-[#BFBFBF] text-sm block">
                                Wallet Address*
                            </label>
                            <input
                                type="text"
                                name="walletAddress"
                                value={walletAddress.value}
                                onChange={(e) =>
                                    setWalletAddress({ ...walletAddress, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    walletAddress.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="bankName" className="text-[#BFBFBF] text-sm block">
                                Bank Name*
                            </label>
                            <input
                                type="text"
                                name="bankName"
                                value={bankName.value}
                                onChange={(e) =>
                                    setBankName({ ...bankName, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    bankName.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="accountName" className="text-[#BFBFBF] text-sm block">
                                Account Name*
                            </label>
                            <input
                                type="text"
                                name="accountName"
                                value={accountName.value}
                                onChange={(e) =>
                                    setAccountName({ ...accountName, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    accountName.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="accountNumber" className="text-[#BFBFBF] text-sm block">
                                Account Number*
                            </label>
                            <input
                                type="text"
                                name="accountNumber"
                                value={accountNumber.value}
                                onChange={(e) =>
                                    setAccountNumber({ ...accountNumber, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    accountNumber.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="exchangePlatform" className="text-[#BFBFBF] text-sm block">
                                Exchange Platform*
                            </label>
                            <input
                                type="text"
                                name="exchangePlatform"
                                value={exchangePlatform.value}
                                onChange={(e) =>
                                    setExchangePlatform({ ...exchangePlatform, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    exchangePlatform.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="status" className="text-[#BFBFBF] text-sm block">
                                Status*
                            </label>
                            <select 
                                name="status" 
                                id="status"
                                value={status.value}
                                onChange={(e) =>
                                    setStatus({ ...status, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    status.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            >
                                <option value="ACTIVE">Active</option>
                                <option value="DEACTIVATED">Deactive</option>
                            </select>
                            
                        </div>

                        <div className="my-3 text-center">
                            <button
                                onClick={() => handleSubmit()}
                                className="bg-[#134FE7] text-white py-1 px-10 rounded-2xl"
                            >
                                {loading ? "Processing..." : "Update"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default GiftcardUpdateForm;