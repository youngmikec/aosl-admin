import React from 'react';
import successIcon from '../../assets/icons/success-icon.png';

type Props = {
    title: string;
    subTitle?: string;
    msg: string;
}

const SuccessAlert = ({ title, subTitle, msg }: Props) => {
  return (
    <>
        <div className="w-full">
            <div className='flex justify-center my-4'>
                <img src={successIcon} alt="success icon" width="100px" height="100px" />
            </div>
            <div className='my-4 text-center'>
                <h3 className='text-2xl font-semibold text-[#24C751] my-4'>{ title }</h3>
                {
                    subTitle && <h4 className='text-lg font-semibold text-[#8c8c8c] my-2'>{ subTitle }</h4>
                }
                <h3 className='text-sm text-[#8c8c8c] my-2'>{ msg }</h3>
            </div>
        </div>
    </>
  )
}

export default SuccessAlert;