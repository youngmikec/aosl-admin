import React from 'react';
import moment from 'moment';

import { Order } from '../../models';
import { getFullName } from '../../utils';


type Props = {
    order?: Order
}
const OrderDetailComp = ({ order }: Props) => {
    const defaultImage: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNsNiYYMGaSw8QAyBMKifpOnueuPOu_bHDYQ&usqp=CAU';
    return (
        <>
            <div className='w-full py-4 text-[#7F7F80]'>
                <div className='text-center my-3'>
                    <h2 className='font-bold text-2xl'>Order Detail Modal</h2>
                </div>

                <div className='grid 
                    grid-cols-1 
                    sm:grid-cols-1 
                    md:grid-cols-2 md:space-x-2
                    lg:grid-cols-2 lg:space-x-2'
                >
                    <div className='flex justify-center items-center'>
                        <img src={order?.proofImage || defaultImage } width="50%" className='object-cover' alt="crypto" />
                    </div>

                    <div className='px-4'>
                        <p className='my-2'><strong>Order Code:</strong>  {order?.code}</p>
                        <p className='my-3'><strong>Order Type:</strong>  {order?.orderType}</p>
                        <p className='my-3'><strong>Amount:</strong>  ${order?.amount} worth
                            {
                                order?.airtime &&
                                <p className='my-3'><strong>Airtime:</strong>  {order?.airtime?.name}</p>
                            }
                            {
                                order?.giftcard &&
                                <p className='my-3'><strong>Giftcard:</strong>  {order?.giftcard?.name}</p>
                            }
                            {
                                order?.cryptocurrency &&
                                <p className='my-3'><strong>Cryptocurrency:</strong>  {order?.cryptocurrency?.name}</p>
                            }
                        </p>
                        <p className='my-3'><strong>Amount Receivable:</strong> NGN {order?.amountReceivable}</p>
                        {
                            order?.airtime &&
                            <p className='my-3'><strong>Airtime:</strong>  {order?.airtime?.name}</p>
                        }
                        {
                            order?.giftcard &&
                            <p className='my-3'><strong>Giftcard:</strong>  {order?.giftcard?.name}</p>
                        }
                        {
                            order?.cryptocurrency &&
                            <p className='my-3'><strong>Cryptocurrency:</strong>  {order?.cryptocurrency?.name}</p>
                        }
                        <p className='my-3'><strong>User First Name:</strong>  {order?.user?.firstName}</p>
                        <p className='my-3'><strong>User Last Name:</strong>  {order?.user?.lastName}</p>
                        <p className='my-3'><strong>User email:</strong>  {order?.user?.email}</p>
                        <p className='my-3'><strong>User Phone:</strong>  {order?.user?.phone}</p>
                        <p className='my-3'><strong>Account Name:</strong>  {order?.accountName}</p>
                        <p className='my-3'><strong>Account Number:</strong>  {order?.accountNumber}</p>
                        <p className='my-3'><strong>Bank</strong>  {order?.bankName}</p>
                        <p className='my-3'><strong>Created At:</strong>  {moment(order?.createdAt).format("MM-DD-YYYY")}</p>
                        <p className='my-3'><strong>Created By:</strong>  {getFullName(order?.createdBy)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetailComp;