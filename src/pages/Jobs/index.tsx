import React, { FC } from 'react';

import UserLayout from '../../shared/layouts/user-layout';
import JobsComp from '../../components/jobs-comp';
// style link end 

const JobsPage: FC = () => {

    return (

        <UserLayout>
            <JobsComp />
        </UserLayout>
    )
}

export default JobsPage;


