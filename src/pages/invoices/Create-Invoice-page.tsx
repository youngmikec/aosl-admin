import { FC, useState } from 'react';

import UserLayout from '../../shared/layouts/user-layout';
import InvoiceForm from '../../components/InvoiceComp/invoice-form';
// style link end 

const CreateInvoicePage: FC = () => {

    const [formMode, setFormMode] = useState<string>('create');


    return (

        <UserLayout>
          <InvoiceForm mode={formMode} />
        </UserLayout>
    )
}

export default CreateInvoicePage;


