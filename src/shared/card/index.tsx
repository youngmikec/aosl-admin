import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode,
    title?: string;
    body?: any;
    type: 'sm' | 'lg'
}

const Card = ({ children, title, type }: Props) => {
  return (
    <>
        <div className={
            `bg-white dark:bg-gray-900 shadow-xl w-full h-max ${type === 'sm' ? 'p-4 rounded-lg' : 'p-8 rounded-xl'}`
        }>
            {
                title && 
                <div className=''>
                    <h3 className='text-2xl font-medium capitalize text-[#134FE7]'>{ title }</h3>
                </div>
            }
            <div className="dark:bg-gray-900">
                { children }
            </div>
        </div>
    </>
  )
}

export default Card;