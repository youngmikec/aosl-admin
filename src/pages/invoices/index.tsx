import React, { FC } from 'react';

import UserLayout from '../../shared/layouts/user-layout';
import InvoiceComp from '../../components/InvoiceComp';
// style link end 

const InvoicePage: FC = () => {

    return (

        <UserLayout>
          <InvoiceComp />
        </UserLayout>
    )
}

export default InvoicePage;


