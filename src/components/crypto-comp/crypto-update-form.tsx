import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';

import './style.css';
import { ApiResponse, CryptoCurrency, Network } from '../../models';
import { UPDATE_CRYPTO } from '../../service';
import NetworkAddComp from './network-add-comp';
import { UPDATE_CRYPTO_STATE } from '../../store/cryptos';
import ImgUploader from '../../shared/file-uploader';

type Props = {
    crypto?: CryptoCurrency
}

const CryptoUpdateForm = ({ crypto }: Props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const [cryptoImage, setCryptoImage] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [barcode, setBarcode] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [name, setName] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [shortName, setShortName] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [rate, setRate] = useState<{value: number, error: boolean } | any>({value: 0, error: false});
    const [sellingRate, setSellingRate] = useState<{value: number, error: boolean } | any>({value: 0, error: false});
    const [walletAddress, setWalletAddress] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [exchangePlatform, setExchangePlatform] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [bankName, setBankName] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [accountName, setAccountName] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [accountNumber, setAccountNumber] = useState<{value: string, error: boolean } | any>({value: '', error: false});
    const [networks, setNetworks] = useState<{value: Network[], error: boolean } | any>({value: [], error: false});
    const [status, setStatus] = useState<{value: string, error: boolean } | any>({value: '', error: false});

    const handleAddNetwork = ( data: any ) => {
        setNetworks({value: [data, ...networks.value], error: false});
    }

    const removeNetwork = (name: string) => {
        const filteredArray: Network[] = networks.value.filter((item: Network) => item.networkName !== name);
        setNetworks({value: [...filteredArray], error: false});
    }

    const fileRef = useRef<HTMLInputElement>(null);
    const barcodeRef = useRef<HTMLInputElement>(null);

    const openFile = () => {
        return fileRef.current?.click();
    }
    const openBarcodeFile = () => {
        return barcodeRef.current?.click();
    }

    const handleFileRead = async (event: any) => {
        const file = event.target.files[0];
        const base64: any = await convertBase64(file);
        setCryptoImage({...cryptoImage, value: base64});
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

    const removeCryptoImage = () => {
        setCryptoImage({value: '', error: false});
    }
    const removeBarcodeImage = () => {
        setBarcode({value: '', error: false});
    }


    const clearFormStates = () => {
        setCryptoImage({value: '', error: false});
        setName({value: '', error: false});
        setShortName({value: '', error: false});
        setRate({value: 0, error: false});
        setSellingRate({value: 0, error: false});
        setWalletAddress({value: '', error: false});
        setExchangePlatform({value: '', error: false});
        setBankName({value: '', error: false});
        setAccountName({value: '', error: false});
        setAccountNumber({value: '', error: false});
        setNetworks({value: [], error: false});
        setStatus({value: '', error: false});
    }

    const handleSetBarCode = (data: string) => {
        setBarcode({ value: data, error: false })
    }

    const handleSubmit = () => {
        setLoading(true);
        const data = { 
            name: name.value,
            shortName: shortName.value,
            rate: rate.value,
            sellingRate: sellingRate.value,
            networks: networks.value,
            walletAddress: walletAddress.value,
            exchangePlatform: exchangePlatform.value,
            cryptoImage: cryptoImage.value,
            barcode: barcode.value,
            bankName: bankName.value,
            status: status.value,
            accountName: accountName.value,
            accountNumber: accountNumber.value,
        };
        const id: string = crypto?.id ? crypto.id : '';
        UPDATE_CRYPTO(id, data)
            .then((res: AxiosResponse<ApiResponse>) => {
                const { message, payload } = res.data;
                setLoading(false);
                notify("success", message);
                dispatch(UPDATE_CRYPTO_STATE(payload));
                clearFormStates();
            })
            .catch((err: any) => {
                const { message } = err.response.data;
                notify("error", message);
                setLoading(false);
            });
         
    };

    useEffect(() => {
        setName({value: crypto?.name, error: false});
        setShortName({value: crypto?.shortName, error: false});
        setRate({value: crypto?.rate, error: false});
        setSellingRate({value: crypto?.sellingRate, error: false});
        setWalletAddress({value: crypto?.walletAddress, error: false});
        setExchangePlatform({value: crypto?.exchangePlatform, error: false});
        setBankName({value: crypto?.bankName, error: false});
        setAccountName({value: crypto?.accountName, error: false});
        setAccountNumber({value: crypto?.accountNumber, error: false});
        setCryptoImage({value: crypto?.cryptoImage, error: false});
        setBarcode({value: crypto?.barcode, error: false});
        setStatus({ value: crypto?.status, error: false});
    }, [])

    useEffect(() => {
        const mappedNetworks: any[] | undefined = crypto?.networks.map((item: Network) => {
            return { networkName: item.networkName}
        })
        console.log({ mappedNetworks })
        setNetworks({value: mappedNetworks, error: false});
    }, [])

    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:space-x-3'>
                <div>
                    <div
                        className={`border-2 rounded-md my-3 h-60 w-full flex justify-center ${
                            cryptoImage.error ? 'error-border' : 'input-border'
                        } px-4 py-2 relative`}
                    >
                        {cryptoImage.value && <span onClick={() => removeCryptoImage()} className='absolute top-2 cursor-pointer right-3 z-10'>X</span>}
                        {
                            cryptoImage.value ? 
                            <div className='flex justify-center items-center'>
                                <img src={cryptoImage?.value} width="30%" className='cursor-pointer' alt="uploaded" onClick={() => openFile()} /> 
                            </div> :
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

                    <div
                        className={`border-2 rounded-md my-3 h-60 w-full flex justify-center ${
                            barcode.error ? 'error-border' : 'input-border'
                        } px-4 py-2 relative`}
                    >
                        {barcode.value && <span onClick={() => removeBarcodeImage()} className='absolute top-2 cursor-pointer right-3 z-10'>X</span>}
                        {
                            barcode.value ? 
                            <div className='flex justify-center items-center'>
                                <img src={barcode?.value} width="30%" className='cursor-pointer' alt="uploaded" onClick={() => openFile()} />
                            </div> :
                            <button className='text-center text-[#7F7F80]' onClick={() => openBarcodeFile()}>
                                + <br /> Upload Wallet QR code
                            </button>
                        }
                        <input 
                            type="file" 
                            className='hidden'
                            ref={barcodeRef}
                            onChange={(e) => handleBarcodeFileRead(e)}
                        />
                    </div>
                    {/* <ImgUploader
                        error={barcode?.error}
                        labelText='Upload Wallet QR code'
                        onLoaded={handleSetBarCode}
                    /> */}
                </div>

                <div>
                    <div id='form'>

                        <div className="my-3">
                            <label htmlFor="name" className="text-[#BFBFBF] text-sm block">
                                Crypto Name*
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
                                Crypto short Name*
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
                                Buy Rate per dollar*
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
                                Selling Rate per dollar*
                            </label>
                            <input
                                type="number"
                                name="sellingRate"
                                min={0}
                                value={sellingRate.value}
                                onChange={(e) =>
                                    setSellingRate({ ...sellingRate, value: parseInt(e.target.value) })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    sellingRate.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
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

                        <NetworkAddComp
                            networks={networks.value}
                            addFunc={handleAddNetwork}
                            removeFunc={removeNetwork}
                        />



                        <div className="my-3 text-center">
                            <button
                                onClick={() => handleSubmit()}
                                className="bg-[#8652A4] text-white py-1 px-10 rounded-2xl"
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

export default CryptoUpdateForm;