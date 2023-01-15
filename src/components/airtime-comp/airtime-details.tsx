import React from 'react';
import { Airtime } from '../../models';
import moment from 'moment';
import { getFullName } from '../../utils';


type Props = {
    airtime?: Airtime
}
const AirtimeDetailComp = ({ airtime }: Props) => {

    return (
        <>
            <div className='w-full py-4 text-[#7F7F80]'>
                <div className='text-center my-3'>
                    <h2 className='font-bold text-2xl'>Airtime Detail Modal</h2>
                </div>

                <div className='grid 
                    grid-cols-1 
                    sm:grid-cols-1 
                    md:grid-cols-2 md:space-x-2
                    lg:grid-cols-2 lg:space-x-2'
                >
                    <div >
                        <img src={airtime?.networkImage} width="100%" alt="airtime" />
                    </div>

                    <div className='px-4'>
                        <p className='my-2'><strong>Name:</strong>  {airtime?.name}</p>
                        <p className='my-3'><strong>Short Name:</strong>  {airtime?.shortName}</p>
                        <p className='my-3'><strong>Rate:</strong>  {airtime?.rate}</p>
                        <p className='my-3'><strong>Transaction Network:</strong>  {airtime?.txnNetwork}</p>
                        <p className='my-3'><strong>Transaction Number:</strong>  {airtime?.txnNetworkNumber}</p>
                        <p className='my-3'><strong>Created At:</strong>  {moment(airtime?.createdAt).format("MM-DD-YYYY")}</p>
                        <p className='my-3'><strong>Created By:</strong>  {getFullName(airtime?.createdBy)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AirtimeDetailComp;