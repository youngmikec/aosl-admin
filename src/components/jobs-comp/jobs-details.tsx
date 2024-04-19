import React, { FC } from 'react';
import moment from 'moment';
import { getFullName } from '../../utils';
import CustomDetailField from '../CustomDetailField';
import { Job } from '../../models';


type Props = {
    data?: Job
}
const JobsDetailComp: FC<Props> = ({ data }) => {

    return (
        <>
            <div className='w-full py-4 text-[#7F7F80]'>
                <div className='text-center my-3'>
                    <h2 className='font-bold text-2xl'>Job/Training Detail Modal</h2>
                </div>

                <div >
                    <img src={data?.jobImage} className='mx-auto w-2/12' alt="job image" />
                </div>

                <div className='px-4 my-6'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CustomDetailField label='Job Title:' value={data?.title} />
                        <CustomDetailField label='Description:' value={data?.description} />
                        <CustomDetailField label='Job Type:' value={data?.type} />
                        <CustomDetailField label='Employeeing Company:' value={data?.companyName} />
                        <CustomDetailField label='Job Duration:' value={data?.termDuration} />
                        <CustomDetailField label='Job Work Mode:' value={data?.workMode} />
                        <CustomDetailField label='Status' value={data?.status} />
                        <CustomDetailField label='Created At:' value={moment(data?.createdAt).format("MM-DD-YYYY")} />
                        <CustomDetailField label='Created By:' value={getFullName(data?.createdBy)} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobsDetailComp;