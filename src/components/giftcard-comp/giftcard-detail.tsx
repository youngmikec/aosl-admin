import React from 'react';
import moment from 'moment';

import { GiftCard } from '../../models';
import { getFullName } from '../../utils';
import CustomDetailField from '../CustomDetailField';


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

                <div >
                    <img src={giftcard?.giftcardImage || defaultImage } className='mx-auto w-2/12' alt="crypto" />
                </div>

                <div className='px-4'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CustomDetailField label='Name:' value={giftcard?.name} />
                        <CustomDetailField label='Short Name:' value={giftcard?.shortName} />
                        <CustomDetailField label='Buy Rate:' value={giftcard?.rate} />
                        <CustomDetailField label='Wallet Address:' value={giftcard?.walletAddress} />
                        <CustomDetailField label='Exchange Platform:' value={giftcard?.exchangePlatform} />
                        <CustomDetailField label='Bank Name:' value={giftcard?.bankName} />
                        <CustomDetailField label='Account Name:' value={giftcard?.accountName} />
                        <CustomDetailField label='Account Number:' value={giftcard?.accountNumber} />
                        <CustomDetailField label='Status:' value={giftcard?.status} />
                        <CustomDetailField label='Created At:' value={moment(giftcard?.createdAt).format("MM-DD-YYYY")} />
                        <CustomDetailField label='Created By:' value={getFullName(giftcard?.createdBy)} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default GiftcardDetailComp;