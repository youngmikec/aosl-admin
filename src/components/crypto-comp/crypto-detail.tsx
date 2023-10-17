import React from 'react';
import { CryptoCurrency } from '../../models';
import moment from 'moment';
import { getFullName } from '../../utils';
import CustomDetailField from '../CustomDetailField';


type Props = {
    crypto?: CryptoCurrency
}
const CryptoDetailComp = ({ crypto }: Props) => {

    return (
        <>
            <div className='w-full py-4 text-[#7F7F80]'>
                <div className='text-center my-3'>
                    <h2 className='font-bold text-2xl'>Crypto Detail Modal</h2>
                </div>

                <div >
                    <img src={crypto?.cryptoImage} className='mx-auto w-2/12' alt="crypto" />
                </div>

                <div className='px-4 my-6'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CustomDetailField label='Name:' value={crypto?.name} />
                        <CustomDetailField label='Short Name:' value={crypto?.shortName} />
                        <CustomDetailField label='Buy Rate:' value={crypto?.rate} />
                        <CustomDetailField label='Selling Rate:' value={crypto?.sellingRate || 0} />
                        <CustomDetailField label='Wallet Address:' value={crypto?.walletAddress} />
                        <CustomDetailField label='Exchange Platform:' value={crypto?.exchangePlatform} />
                        <CustomDetailField label='Bank Name:' value={crypto?.bankName} />
                        <CustomDetailField label='Account Name:' value={crypto?.accountName} />
                        <CustomDetailField label='Account Number:' value={crypto?.accountNumber} />
                        <CustomDetailField label='Status:' value={crypto?.status} />
                        <CustomDetailField label='Created At:' value={moment(crypto?.createdAt).format("MM-DD-YYYY")} />
                        <CustomDetailField label='Created By:' value={getFullName(crypto?.createdBy)} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CryptoDetailComp;