import React, { FC } from 'react';
import moment from 'moment';
import { formatCurrency, getFullName } from '../../utils';
import CustomDetailField from '../CustomDetailField';
import { Invoice, InvoiceService } from '../../models';


type Props = {
    data: Invoice | undefined
}
const InvoiceDetailsComp: FC<Props> = ({ data }) => {

    return (
        <>
            <div className='w-full py-4 text-[#7F7F80]'>
                <div className='text-center my-3'>
                    <h2 className='font-bold text-2xl'>Invoice Detail Modal</h2>
                </div>

                <div >
                    {/* <img src={data?.resume} className='mx-auto w-2/12' alt="Uploaded resume" /> */}
                </div>

                <div className='px-4 my-6'>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <CustomDetailField label='First Name:' value={data?.invoiceCode} />
                      <CustomDetailField label='Invoice url:' value={data?.invoiceUrl.slice(0, 40).concat('...')} hasCopyBtn={true} />
                      <CustomDetailField label='Total amount:' value={formatCurrency(data?.totalAmount, data?.currency)} />
                      <CustomDetailField label='Currency:' value={data?.currency} />
                      <CustomDetailField label='Status:' value={data?.status} />
                      <CustomDetailField label='Date Issued' value={moment(data?.issueDate).format("MM-DD-YYYY")} />
                      <CustomDetailField label='Due Date:' value={moment(data?.dueDate).format("MM-DD-YYYY")} />
                  </div>
                </div>

                <div className='my-3 mx-4 border-[1px] border-[#7F7F80] p-4 rounded-md'>
                      <p>Services</p>
                  <div className="my-2 flex flex-start gap-4">
                    {
                      (data && data.services.length > 0) ? 
                      data.services.map((service: InvoiceService) => 
                        (<div className='border-[1px] border-[#7F7F80] bg-[#7F7F80] text-white px-4 py-2 rounded-full'>{service?.name}</div>)
                      ) 
                      : 'No Service Added'
                    }
                  </div>
                </div>

                <div className='px-4 my-6'>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <CustomDetailField label='Company Name:' value={data?.companyName} />
                      <CustomDetailField label='Company Email:' value={data?.companyEmail} />
                      <CustomDetailField label='Company Phone:' value={data?.companyPhone} />
                      <CustomDetailField label='Tax:' value={data?.tax} />
                      <CustomDetailField label='Discount:' value={`${data?.discount}%`} />
                      <CustomDetailField label='Amount Paid:' value={formatCurrency(data?.amountPaid, data?.currency)} />
                      <CustomDetailField label='Balance Amount:' value={formatCurrency(data?.balanceAmount, data?.currency)} />
                      <CustomDetailField label='Payment Gateway:' value={data?.paymentGateway} />
                      <CustomDetailField label='Status' value={data?.status} />
                      <CustomDetailField label='Created At:' value={moment(data?.createdAt).format("MM-DD-YYYY")} />
                      <CustomDetailField label='Created By:' value={getFullName(data?.createdBy)} />
                  </div>
                </div>

            </div>
        </>
    )
}

export default InvoiceDetailsComp;