import React, { ReactNode, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';
import Navbar from '../navbar';
import Sidebar from '../sidebar';
import { ApiResponse, User } from '../../models';
import { RETRIEVE_PROFILE } from '../../service';
import { SET_PROFILE_DATA } from '../../store/profile';
import { RootState } from '../../store';
import LogoutComp from '../logout-comp';

type Props = {
    children: ReactNode
}

const UserLayout = ({children}: Props) =>  {
  const userProfile = useSelector((state: RootState) => state.profileState.value);
  const dispatch = useDispatch();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profile, setProfile] = useState<User | null>(null)

  const retreiveProfile = () => {
    setLoadingProfile(true);
    RETRIEVE_PROFILE().then((res: AxiosResponse<ApiResponse>) => {
        setLoadingProfile(false);
        const { success, message, payload } = res.data;
        if(success){
            setProfile(payload);
            dispatch(SET_PROFILE_DATA(payload))
        }
    }).catch((err: any) => {
        setLoadingProfile(false);
        const { message } = err.response.data;
    })
}

  useEffect(() => {
    userProfile ? setProfile(userProfile) : retreiveProfile()
  }, []);

  return (
    <>
      <div className='content-wrapper flex dark:bg-gray-900'>
          <div className='flex-2 hidden min-h-screen
              sm:hidden
              md:block
              lg:block'
          >
              <Sidebar />
          </div>
          <div className='w-full lg:flex-1 dark:bg-gray-800'>
              <div className='mx-auto w-11/12 dark:bg-gray-800'>
                <Navbar profile={profile} loading={loadingProfile} />
                { children }
              </div>
          </div>
      </div>
      <LogoutComp />
    </>
  )
}

export default UserLayout;
