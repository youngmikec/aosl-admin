import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';
import moment from 'moment';

import Card from '../../shared/card';
import { RootState } from '../../store';
import { ApiResponse, Invoice } from '../../models';
import AppTable, { TableHeader } from '../../shared/app-table';
import { CloseAppModal, OpenAppModal } from '../../store/modal';
import DropdownComp, { DropdownList } from '../../shared/dropdown';
import { INITIALIZE_INVOICES, REMOVE_INVOICE } from '../../store/invoice';
import { DELETE_INVOICE, RETRIEVE_INVOICES, UPDATE_INVOICE } from '../../service';
import { formatCurrency } from '../../utils';
import AppModalComp from '../../shared/app-modal';
import DeleteComp from '../../shared/delete-comp/delete-comp';
import InvoiceDetailsComp from './invoice-details';
import InvoiceForm from './invoice-form';

const InvoiceComp: FC = () => {
  const dispatch = useDispatch();
    const Invoices: Invoice[] = useSelector((state: RootState) => state.invoiceState.value);

    const [deleting, setDeleting] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [tableRows, setTableRows] = useState<any[]>([]);

    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | undefined>();
    const [modalMode, setModalMode] = useState<string>('');

    const tableHeaders: TableHeader[] = [
        { key: 'sn', value: 'S/N' },
        { key: 'code', value: 'Invoice Code' },
        { key: 'issuedDate', value: 'Issued Date' },
        { key: 'dueDate', value: 'Due Date' },
        { key: 'totalAmount', value: 'Amount'},
        { key: 'currency', value: 'Currency'},
        { key: 'status', value: 'Status' },
        { key: 'actions', value: 'Actions' },
    ];

    const notify = (type: string, msg: string) => {
        if (type === "success") {
        toast.success(msg, {
            position: toast.POSITION.TOP_RIGHT,
        });
        }

        if (type === "error") {
        toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT,
        });
        }
    };

    const populateActions = (item: Invoice): DropdownList[] => {
      const tableActions: DropdownList[] = [
        { 
            label: 'View Detail', 
            disabled: false,
            action: () => {
              setSelectedInvoice(item)
              openCryptoModal('view');
            }
        },
        // { 
        //     label: 'Update Invoice', 
        //     disabled: item.status !== "COMPLETED" ? false : true,
        //     action: () => {
        //       handleOrderComplete(item.id, "COMPLETED")
        //     }
        // },
        { 
          label: 'Delete Invoice', 
          disabled: false,
          action: () => {
            setSelectedInvoice(item)
            openCryptoModal('delete')
          }
        },
      ]
      return tableActions;
    }

    const openModal = (mode: string = 'create', id: string = '') => {
      setModalMode(mode);
      dispatch(OpenAppModal());
  }


    const retrieveInvoices = () => {
        const query: string = `?sort=-createdAt&populate=user`;
        RETRIEVE_INVOICES(query)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            notify("success", message);
            setInvoices(payload);
            
            const mappedDate = payload.map((item: Invoice, idx: number) => {
                const actions = populateActions(item);
                console.log('actions', actions);
                return {
                    sn: idx + 1,
                    code: item?.invoiceCode,
                    issuedDate: moment(item?.issueDate).format("MM-DD-YYYY"),
                    dueDate: moment(item?.dueDate).format("MM-DD-YYYY"),
                    totalAmount: formatCurrency(item?.totalAmount, item?.currency),
                    date: moment(item?.createdAt).format("MM-DD-YYYY"),
                    status: item?.status === 'PENDING' ? 
                    <button className='border-[#FF3E1D] border-2 text-[#FF3E1D] text-sm py-1 px-4 rounded-md'>{item.status}</button>
                    :
                    <button className='bg-[#71DD37] text-white text-sm py-1 px-4 rounded-md'>{item.status}</button>,
                    currency: item?.currency,
                    actions: <DropdownComp dropdownList={actions} />
                }
            });
            setTableRows(mappedDate);
            dispatch(INITIALIZE_INVOICES(payload));
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            notify("error", message);
        });
    };


    const handleSearchQuery = () => {
        setSearching(true);
        if(searchQuery !== '') {
            const filteredResults: Invoice[] = invoices.filter((item: Invoice) => Object.values(item).includes(searchQuery));
            setInvoices(filteredResults);
            setSearching(false);
        }else {
            setInvoices(Invoices);
            setSearching(false);
        }
    }

    const openCryptoModal = (mode: string = 'create', id: string = '') => {
      setModalMode(mode);
      dispatch(OpenAppModal());
    }

    const handleDeleteRecord = (id: string) => {
        setDeleting(true);
        DELETE_INVOICE(id)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload, success } = res.data;
            if(success){
                setDeleting(false);
                notify("success", message);
                dispatch(REMOVE_INVOICE(payload.id));
                dispatch(CloseAppModal());
            }
        })
        .catch((err: any) => {
            setDeleting(false);
            const { message } = err.response.data;
            notify("error", message);
        });
    }

    const handleOrderComplete = (id: string, status: string) => {
        const data = { status };
        UPDATE_INVOICE(id, data)
          .then((res: AxiosResponse<ApiResponse>) => {
            const { message } = res.data;
            notify("success", message);
            retrieveInvoices();
          })
          .catch((err: any) => {
            const { message } = err.response.data;
            notify("error", message);
          });
    };
    
    useEffect(() => {
      retrieveInvoices();
    }, []);

    useEffect(() => {
      setInvoices(Invoices)
    }, [Invoices]);


  return (
    <>
       <div className="w-full">
          <Card type='lg'>
            {/* Title section */}
            <div id="title">
              <div className="flex flex-col sm:justify-between md:justify-between lg:flex-row lg:justify-between w-full">
                <div className='mb-8'>
                    <h3 className='text-[#134FE7] text-xl font-bold mb-1'>Invoice Table</h3>
                    <p className='text-[#7F7F80] text-sm'>Displaying {invoices.length} of {invoices.length} Invoice(s)</p>
                </div>
                <div className='mb-8'>
                    <button 
                        className='bg-[#134FE7] text-white py-2 px-4 rounded-md'
                        onClick={() => openModal('create')}
                    >
                        Create Invoice
                    </button>
                </div>
              </div>
            </div>
            {/* Title section */}
            <AppTable tableHeaders={tableHeaders} tableRows={tableRows} />
          </Card>
      </div>

      <AppModalComp title=''>
          {
              modalMode === 'create' && <InvoiceForm mode={modalMode} />
          }
          {
              modalMode === 'view' && <InvoiceDetailsComp data={selectedInvoice} />
          }
          {/* {
              modalMode === 'update' && <ApplicationForm mode={modalMode} record={selectedRecord}  />
          } */}
          {
              modalMode === 'delete' && <DeleteComp id={selectedInvoice?.id} action={handleDeleteRecord} deleting={deleting} />
          }
      </AppModalComp>

      <ToastContainer />
    </>
  )
}

export default InvoiceComp;