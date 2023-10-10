import { useState, useRef } from "react"

type Props = {
    error: boolean;
    labelText: string;
    onLoaded: (data: string) => any
}

const ImgUploader = ({error, labelText = "Upload Wallet QR code", onLoaded}: Props) => {
    const fileRef = useRef<HTMLInputElement>(null)
    const [uploadedImg, setUploadedImg] = useState({ value: ''})

    const removeImage = () => {
        setUploadedImg({value: ''});
    }

    const openFile = () => {
        return fileRef.current?.click();
    }

    const handleBarcodeFileRead = async (event: any) => {
        const file = event.target.files[0];
        const base64: any = await convertBase64(file);
        setUploadedImg({ value: base64 });
        onLoaded(base64);
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

    return (
        <>
            <div
                className={`border-2 rounded-md my-3 h-60 w-full flex justify-center ${
                    error ? 'error-border' : 'input-border'
                } px-4 py-2 relative`}
            >
                {
                    uploadedImg.value !== '' && <span onClick={() => removeImage()} className='absolute top-2 cursor-pointer right-3 z-10'>X</span>
                }
                {
                    uploadedImg.value !== '' ? 
                    <div className='flex justify-center items-center'>
                        <img src={uploadedImg?.value} width="60%" className='cursor-pointer' alt="uploaded" onClick={() => openFile()} />
                    </div> :
                    <button className='text-center text-[#7F7F80]' onClick={() => openFile()}>
                        + <br /> { labelText }
                    </button>
                }
                <input 
                    type="file" 
                    className='hidden'
                    ref={fileRef}
                    onChange={(e) => handleBarcodeFileRead(e)}
                />
            </div>
        </>
    )
}

export default ImgUploader;