import { FC, useState } from "react";
import { FaRegCopy } from "react-icons/fa";


type Props = {
    label: string;
    value: any, 
    hasCopyBtn?: boolean;
}

const CustomDetailField: FC<Props> = ({label, value, hasCopyBtn = false }) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);


    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setIsCopied(true);
      
            // Reset the copied state after 3 seconds
            setTimeout(() => {
              setIsCopied(false);
            }, 3000);
      
            return true;
          } catch (err) {
            console.error('Failed to copy text: ', err);
            return false;
          }
    }

    return (
        <>
            <div className="my-2">
                <div className='my-3 w-full border-[1px] border-[#7F7F80] p-4 rounded-md relative'>
                    <p>
                        <strong>{label}</strong>
                        <span className="mx-1 text-md text-justify">
                            { (value && value.length >= 40) ? value.slice(0, 40).concat('...') : value }
                        </span>
                    </p>

                    {
                        hasCopyBtn && 
                        <p className="bg-white p-4 absolute right-4 top-[2px] rounded-2xl transition ease-in ease-out">
                            {
                                isCopied ? <span className="text-[16px]">Copied</span> :  <span onClick={handleCopy}><FaRegCopy size="16px" color="text-[#3e3e3e]" /></span> 
                            }
                        </p>
                    }
                </div>
            </div>
        </>
    )
}

export default CustomDetailField;