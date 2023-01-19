import React from 'react'

const ActivityLog = () => {
  return (
    <>
        <div className="w-full">
            <div className='p-5'>
                <h3 className='text-[#121212] my-4'>Recent Transanctions</h3>
                <div className='overflow-scroll'>
                    <table className='table table-auto w-full mx-auto border-spacing-y-4'>
                        <thead className='text-left'>
                            <tr className='flex justify-around'>
                                <th>#</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th className='pl-20'>Source</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody className='w-10/12 text-sm '>
                            <tr className='flex justify-around mb-2 mt-4 pl-12	'>
                                <td>1</td>
                                <td className='pl-12'>10-02/2022</td>
                                <td>10mins : 57secs</td>
                                <td>Web</td>
                                <td className='completed'>Completed</td>

                            </tr>
                            <tr className='flex justify-around mb-2 mt-4 pl-12	'>
                                <td>1</td>
                                <td className='pl-12'>10-02/2022</td>
                                <td>10mins : 57secs</td>
                                <td>Web</td>
                                <td className='completed'>Completed</td>

                            </tr>
                            <tr className='flex justify-around mb-2 mt-4 pl-12	'>
                                <td>1</td>
                                <td className='pl-12'>10-02/2022</td>
                                <td>10mins : 57secs</td>
                                <td>Web</td>
                                <td className='completed'>Completed</td>

                            </tr>
                            <tr className='flex justify-around mb-2 mt-4 pl-12	'>
                                <td>1</td>
                                <td className='pl-12'>10-02/2022</td>
                                <td>10mins : 57secs</td>
                                <td>Web</td>
                                <td className='completed'>Completed</td>

                            </tr>
                            <tr className='flex justify-around mb-2 mt-4 pl-12	'>
                                <td>1</td>
                                <td className='pl-12'>10-02/2022</td>
                                <td>10mins : 57secs</td>
                                <td>Web</td>
                                <td className='completed'>Completed</td>

                            </tr>
                        </tbody>

                    </table>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default ActivityLog