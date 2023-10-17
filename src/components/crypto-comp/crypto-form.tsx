import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';

import './style.css';
import { ApiResponse, Network } from '../../models';
import { CREATE_CRYPTO } from '../../service';
import { ADD_TO_CRYPTOS } from '../../store/cryptos';
import NetworkAddComp from './network-add-comp';
import ImgUploader from '../../shared/file-uploader';


const CryptoForm = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const [cryptoImage, setCryptoImage] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [barcode, setBarcode] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [name, setName] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [shortName, setShortName] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [rate, setRate] = useState<{value: number, error: boolean }>({value: 0, error: false});
    const [sellingRate, setSellingRate] = useState<{value: number, error: boolean }>({value: 0, error: false});
    const [walletAddress, setWalletAddress] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [exchangePlatform, setExchangePlatform] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [bankName, setBankName] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [accountName, setAccountName] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [accountNumber, setAccountNumber] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [networks, setNetworks] = useState<{value: any[], error: boolean }>({value: [], error: false});

    const handleAddNetwork = ( data: any ) => {
        setNetworks({value: [data, ...networks.value], error: false});
    }

    const removeNetwork = (name: string) => {
        const filteredArray = networks.value.filter((item: Network) => item.networkName !== name);
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


    const removeCryptoImage = () => {
        setCryptoImage({value: '', error: false});
    }
    const removeBarcodeImage = () => {
        setBarcode({value: '', error: false});
    }

    const handleSetBarCode = (data: string) => {
        console.log('barcode', data);
        setBarcode({ value: data, error: false })
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

    const inputCheck = (): boolean => {
        let isValid: boolean = true;
        if (name.value === "" || undefined || null) {
          isValid = false;
          setName({ ...name, error: true });
        } else {
          setName({ ...name, error: false });
        }

        if (shortName.value === "" || undefined || null) {
          isValid = false;
          setShortName({ ...shortName, error: true });
        } else {
          setShortName({ ...shortName, error: false });
        }
        
        if (walletAddress.value === "" || undefined || null) {
          isValid = false;
          setWalletAddress({ ...walletAddress, error: true });
        } else {
          setWalletAddress({ ...walletAddress, error: false });
        }

        if (exchangePlatform.value === "" || undefined || null) {
          isValid = false;
          setExchangePlatform({ ...exchangePlatform, error: true });
        } else {
          setExchangePlatform({ ...exchangePlatform, error: false });
        }

        if (bankName.value === "" || undefined || null) {
          isValid = false;
          setBankName({ ...bankName, error: true });
        } else {
          setBankName({ ...bankName, error: false });
        }

        if (accountName.value === "" || undefined || null) {
          isValid = false;
          setAccountName({ ...accountName, error: true });
        } else {
          setAccountName({ ...accountName, error: false });
        }

        if (accountNumber.value === "" || undefined || null) {
          isValid = false;
          setAccountNumber({ ...accountNumber, error: true });
        } else {
          setAccountNumber({ ...accountNumber, error: false });
        }

        if (cryptoImage.value === "" || undefined || null) {
          isValid = false;
          setCryptoImage({ ...cryptoImage, error: true });
        } else {
          setCryptoImage({ ...cryptoImage, error: false });
        }

        if (barcode.value === "" || undefined || null) {
          isValid = false;
          setBarcode({ ...barcode, error: true });
        } else {
          setBarcode({ ...barcode, error: false });
        }

        if (rate.value === 0 || undefined || null) {
          isValid = false;
          setRate({ ...rate, error: true });
        } else {
          setRate({ ...rate, error: false });
        }

        if (sellingRate.value === 0 || undefined || null) {
          isValid = false;
          setSellingRate({ ...sellingRate, error: true });
        } else {
          setSellingRate({ ...sellingRate, error: false });
        }

        return isValid;
    };

    const clearFormStates = () => {
        setCryptoImage({value: '', error: false});
        setBarcode({value: '', error: false});
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
    }

    const handleSubmit = () => {
        if (inputCheck()) {
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
                bankName: bankName.value,
                accountName: accountName.value,
                accountNumber: accountNumber.value,
                barcode: barcode.value
            };
          CREATE_CRYPTO(data)
            .then((res: AxiosResponse<ApiResponse>) => {
                const { message, payload } = res.data;
                setLoading(false);
                notify("success", message);
                dispatch(ADD_TO_CRYPTOS(payload));
                clearFormStates();
            })
            .catch((err: any) => {
                const { message } = err.response.data;
                notify("error", message);
                setLoading(false);
            });
        }else {
            notify("error", `Fill in all required fields`);
        }  
    };


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
                                <img src={barcode?.value} width="30%" className='cursor-pointer' alt="uploaded" onClick={() => openBarcodeFile()} />
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
                                {loading ? "Processing..." : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default CryptoForm;