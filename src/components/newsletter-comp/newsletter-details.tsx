import React from 'react';
import moment from 'moment';


import { Newsletter } from '../../models';
import { getFullName } from '../../utils';


type Props = {
    newsletter?: Newsletter
}
const NewsletterDetailComp = ({ newsletter }: Props) => {

    return (
        <>
            <div className='w-full py-4 text-[#7F7F80]'>
                <div className='text-center my-3'>
                    <h2 className='font-bold text-2xl'>Newsletter Detail Modal</h2>
                </div>

                <div className='px-4'>
                    <p className='my-2'><strong>Title:</strong>  {newsletter?.title}</p>
                    <p className='my-3'><strong>Newsletter Subject:</strong>  {newsletter?.subject}</p>
                    <p className='my-3'><strong>Newsletter Status:</strong>  {newsletter?.status}</p>
                    <p className='my-3'><strong>Created By:</strong>  {getFullName(newsletter?.createdBy)}</p>
                    <p className='my-3'><strong>Created At:</strong>  {moment(newsletter?.createdAt).format("MM-DD-YYYY")}</p>
                    <p className='my-3'><strong>Newsletter:</strong></p>
                    <textarea className='my-3'>{newsletter?.message}</textarea>
                </div>
            </div>
        </>
    )
}

export default NewsletterDetailComp;