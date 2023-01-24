import React from 'react';

//components
import UserLayout from '../../shared/layouts/user-layout';
import UserDetailComp from '../../components/users-comp/user-detail-comp';

const UserDetailPage = () => {
  return (
    <>
        <UserLayout>
            <UserDetailComp />
        </UserLayout>
    </>
  )
}

export default UserDetailPage;