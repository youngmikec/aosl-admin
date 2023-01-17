import React from 'react';
import moment from 'moment';

import { GiftCard } from '../../models';
import { getFullName } from '../../utils';


type Props = {
    giftcard?: GiftCard
}
const GiftcardDetailComp = ({ giftcard }: Props) => {
    const defaultImage: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNsNiYYMGaSw8QAyBMKifpOnueuPOu_bHDYQ&usqp=CAU';
    return (
        <>
            <div className='w-full py-4 text-[#7F7F80]'>
                <div className='text-center my-3'>
                    <h2 className='font-bold text-2xl'>Giftcard Detail Modal</h2>
                </div>

                <div className='grid 
                    grid-cols-1 
                    sm:grid-cols-1 
                    md:grid-cols-2 md:space-x-2
                    lg:grid-cols-2 lg:space-x-2'
                >
                    <div >
                        <img src={giftcard?.giftcardImage || defaultImage } width="100%" alt="crypto" />
                    </div>

                    <div className='px-4'>
                        <p className='my-2'><strong>Name:</strong>  {giftcard?.name}</p>
                        <p className='my-3'><strong>Short Name:</strong>  {giftcard?.shortName}</p>
                        <p className='my-3'><strong>Rate:</strong>  {giftcard?.rate}</p>
                        <p className='my-3'><strong>Wallet Address:</strong>  {giftcard?.walletAddress}</p>
                        <p className='my-3'><strong>Exchange Platform:</strong>  {giftcard?.exchangePlatform}</p>
                        <p className='my-3'><strong>Created At:</strong>  {moment(giftcard?.createdAt).format("MM-DD-YYYY")}</p>
                        <p className='my-3'><strong>Created By:</strong>  {getFullName(giftcard?.createdBy)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GiftcardDetailComp;