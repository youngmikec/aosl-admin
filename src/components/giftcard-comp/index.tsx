import React from 'react';
import { BsFillCaretDownFill } from 'react-icons/bs';

import Card from '../../shared/card';

const GiftcardComp = () => {
  return (
    <>
        <div className="w-full">
            <Card type='lg'>
                {/* Title section */}
                <div id="title">
                    <div className='mb-8'>
                        <h3 className='text-[#8652A4] text-xl font-bold mb-1'>Airtime Record Table</h3>
                        <p className='text-[#7F7F80] text-sm'>Displaying 3 of 3 Airtime Record(s)</p>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <div className='w-max text-[#7F7F80] text-sm text-sm py-1 px-4 border-2 border-[#ececec] rounded-md'>
                                <span className='mx-1 inline-block'>sort by type</span>
                                <span className='mx-1 inline-block'> <BsFillCaretDownFill /> </span>
                            </div>
                        </div>

                        <div>
                            <div className='border-2 border-[#ececec] flex justify-start w-max rounded-md'>
                                <input type="text" className='lg:w-80' />
                                <button className='bg-[#8652A4] text-white text-sm px-6 py-2 rounded-md'>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Title section */}

                <div className='my-8'>
                    <div className='w-full overflow-x-scroll'>
                        <table className='table border w-full'>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Email address</th>
                                    <th>Date/Time</th>
                                    <th>Amount</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Card proof</th>
                                </tr>
                            </thead>
                            <br />
                            <tbody className='text-[#7F7F80]'>
                                <tr>
                                    <td>123fhjty</td>
                                    <td>militia@gmail.com</td>
                                    <td>10/11/2022:4:47AM</td>
                                    <td>N 6000</td>
                                    <td>Airtime</td>
                                    <td>
                                        <button className='bg-[#71DD37] text-white text-sm py-1 px-4 rounded-md'>paid</button>
                                    </td>
                                    <td>
                                        <button className='bg-[#7F7F80] text-white text-sm py-1 px-4 rounded-md'>view</button>
                                    </td>
                                </tr>
                                <br />
                                <tr>
                                    <td>123fhjty</td>
                                    <td>militia@gmail.com</td>
                                    <td>10/11/2022:4:47AM</td>
                                    <td>N 6000</td>
                                    <td>Airtime</td>
                                    <td>
                                        <button className='bg-[#71DD37] text-white text-sm py-1 px-4 rounded-md'>paid</button>
                                    </td>
                                    <td>
                                        <button className='bg-[#7F7F80] text-white text-sm py-1 px-4 rounded-md'>view</button>
                                    </td>
                                </tr>
                                <br />
                                <tr>
                                    <td>123fhjty</td>
                                    <td>militia@gmail.com</td>
                                    <td>10/11/2022:4:47AM</td>
                                    <td>N 6000</td>
                                    <td>Airtime</td>
                                    <td>
                                        <button className='bg-[#71DD37] text-white text-sm py-1 px-4 rounded-md'>paid</button>
                                    </td>
                                    <td>
                                        <button className='bg-[#7F7F80] text-white text-sm py-1 px-4 rounded-md'>view</button>
                                    </td>
                                </tr>
                                <br />
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card>
        </div>
    </>
  )
}

export default GiftcardComp;