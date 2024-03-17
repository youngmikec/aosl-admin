import React, { FC } from 'react';

import UserLayout from '../../shared/layouts/user-layout';
import ApplicationComp from '../../components/application-comp';
// style link end 

const ApplicationPage: FC = () => {

    return (

        <UserLayout>
            <ApplicationComp />
        </UserLayout>
    )
}

export default ApplicationPage;


