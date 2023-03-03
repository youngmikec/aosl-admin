import React from 'react';
import { CryptoCurrency } from '../../models';
import moment from 'moment';
import { getFullName } from '../../utils';


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

                <div className='grid 
                    grid-cols-1 
                    sm:grid-cols-1 
                    md:grid-cols-2 md:space-x-2
                    lg:grid-cols-2 lg:space-x-2'
                >
                    <div >
                        <img src={crypto?.cryptoImage} width="100%" alt="crypto" />
                    </div>

                    <div className='px-4'>
                        <p className='my-2'><strong>Name:</strong>  {crypto?.name}</p>
                        <p className='my-3'><strong>Short Name:</strong>  {crypto?.shortName}</p>
                        <p className='my-3'><strong>Rate:</strong>  {crypto?.rate}</p>
                        <p className='my-3'><strong>Wallet Address:</strong>  {crypto?.walletAddress}</p>
                        <p className='my-3'><strong>Exchange Platform:</strong>  {crypto?.exchangePlatform}</p>
                        <p className='my-3'><strong>Bank Name:</strong>  {crypto?.bankName}</p>
                        <p className='my-3'><strong>Account Name:</strong>  {crypto?.accountName}</p>
                        <p className='my-3'><strong>Account Number:</strong>  {crypto?.accountNumber}</p>
                        <p className='my-3'><strong>Created At:</strong>  {moment(crypto?.createdAt).format("MM-DD-YYYY")}</p>
                        <p className='my-3'><strong>Created By:</strong>  {getFullName(crypto?.createdBy)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CryptoDetailComp;