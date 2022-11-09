import React, { ReactNode } from 'react';
import Navbar from '../navbar';
import Sidebar from '../sidebar';

import './style.css';

type Props = {
    children: ReactNode
}

const UserLayout = ({children}: Props) =>  {
  return (
    <>
      <div className='content-wrapper flex'>
          <div className='flex-2 hidden min-h-screen
              sm:hidden
              md:block
              lg:block'
          >
              <Sidebar />
          </div>
          <div className='flex-1'>
              <div className='mx-auto w-11/12'>
                <Navbar />
                { children }
              </div>
          </div>
      </div>
    </>
  )
}

export default UserLayout;
