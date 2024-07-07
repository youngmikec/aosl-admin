import { useState, useEffect, FC } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';

import './style.css';
import { ApiResponse, Application } from '../../models';
import { CREATE_INVOICE } from '../../service';
import { ADD_TO_INVOICES } from '../../store/invoice';
import { RETRIEVE_PRODUCT_SERVICES } from '../../service/product-services';

type Props = {
  mode: string;
  record?: Application
}

const InvoiceForm: FC<Props> = ({ mode, record }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [productServices, setProductServices] = useState<any[]>([]);

    const [issueDate, setIssueDate] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [dueDate, setDueDate] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [totalAmount, setTotalAmount] = useState<{value: number, error: boolean }>({value: 0, error: false});
    const [clientName, setClientName] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [clientEmail, setClientEmail] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [clientPhone, setClientPhone] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [clientAddress, setClientAddress] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [tax, setTax] = useState<{value: number, error: boolean }>({value: 0, error: false});
    const [discount, setDiscount] = useState<{value: number, error: boolean }>({value: 0, error: false});

    const retrieveProductServices = () => {
      RETRIEVE_PRODUCT_SERVICES().then((res: AxiosResponse<ApiResponse>) => {
        const { payload } = res.data;
        if(payload){
          setProductServices(payload);
        }
      }).catch(err => {
        console.log(err);
      })
    }


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

    const inputCheck = (): boolean => {
      let isValid: boolean = true;
      if(issueDate.value === "" || undefined || null) {
        isValid = false;
        setIssueDate({ ...issueDate, error: true });
      } else {
        setIssueDate({ ...issueDate, error: false });
      }

      if(dueDate.value === "" || undefined || null) {
        isValid = false;
        setDueDate({ ...dueDate, error: true });
      } else {
        setDueDate({ ...dueDate, error: false });
      }
      
      if(totalAmount.value === 0 || undefined || null) {
        isValid = false;
        setTotalAmount({ ...totalAmount, error: true });
      } else {
        setTotalAmount({ ...totalAmount, error: false });
      }

      if(clientName.value === "" || undefined || null) {
        isValid = false;
        setClientName({ ...clientName, error: true });
      } else {
        setClientName({ ...clientName, error: false });
      }
      if(clientEmail.value === "" || undefined || null) {
        isValid = false;
        setClientEmail({ ...clientEmail, error: true });
      } else {
        setClientEmail({ ...clientEmail, error: false });
      }
      if(clientPhone.value === "" || undefined || null) {
        isValid = false;
        setClientName({ ...clientPhone, error: true });
      } else {
        setClientName({ ...clientPhone, error: false });
      }

      return isValid;
    };

    const clearFormStates = () => {
      setIssueDate({value: '', error: false});
      setDueDate({value: '', error: false});
      setTotalAmount({value: 0, error: false});
      setClientName({value: '', error: false});
      setClientEmail({value: '', error: false});
      setClientPhone({value: '', error: false});
      setClientAddress({value: '', error: false});
      setTax({value: 0, error: false});
      setDiscount({value: 0, error: false});
    }

    const handleSubmit = () => {
      if (inputCheck()) {
          setLoading(true);
          const data = { 
            issueDate: issueDate.value,
            dueDate: dueDate.value,
            totalAmount: totalAmount.value,
            clientName: clientName.value,
            clientEmail: clientEmail.value,
            clientPhone: clientPhone.value,
            clientAddress: clientAddress.value,
            tax: tax.value,
            discount: discount.value,
          };
        CREATE_INVOICE(data)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            setLoading(false);
            notify("success", message);
            dispatch(ADD_TO_INVOICES(payload));
            clearFormStates();
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            notify("error", message);
            setLoading(false);
        });
      }else {
        notify("error", `Fill in all required fields`);
      }  
    };

    useEffect(() => {
      retrieveProductServices();
    }, [])

    return (
      <>
        <div id='form'>
          <h1 className="text-[#134fe7] font-bold text-2xl my-4">Create Invoice form</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">

            <div className="my-3">
                <label htmlFor="name" className="text-[#BFBFBF] text-sm block">
                    Client Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={clientName.value}
                  onChange={(e) =>
                    setClientName({ ...clientName, value: e.target.value })
                  }
                  className={`bg-white text-[#6A6A6A] border-2 ${
                    clientName.error ? 'error-border' : 'input-border'
                  } rounded-md px-4 py-2 w-full`}
                />
            </div>

            <div className="my-3">
                <label htmlFor="shortName" className="text-[#BFBFBF] text-sm block">
                    Client Email*
                </label>
                <input
                    type="text"
                    name="clientEmail"
                    value={clientEmail.value}
                    onChange={(e) =>
                      setClientEmail({ ...clientEmail, value: e.target.value })
                    }
                    className={`bg-white text-[#6A6A6A] border-2 ${
                      clientEmail.error ? 'error-border' : 'input-border'
                    } rounded-md px-4 py-2 w-full`}
                />
            </div>

            <div className="my-3">
                <label htmlFor="rate" className="text-[#BFBFBF] text-sm block">
                  Client Phone*
                </label>
                <input
                  type="text"
                  name="clientPhone"
                  min={0}
                  value={clientPhone.value}
                  onChange={(e) =>
                      setClientPhone({ ...clientPhone, value: e.target.value })
                  }
                  className={`bg-white text-[#6A6A6A] border-2 ${
                    clientPhone.error ? 'error-border' : 'input-border'
                  } rounded-md px-4 py-2 w-full`}
                />
            </div>

            <div className="my-3">
              <label htmlFor="txnNetwork" className="text-[#BFBFBF] text-sm block">
                Client Address
              </label>
              <input
                type="text"
                name="clientAddress"
                value={clientAddress.value}
                onChange={(e) =>
                  setClientAddress({ ...clientAddress, value: e.target.value })
                }
                className={`bg-white text-[#6A6A6A] border-2 ${
                    clientAddress.error ? 'error-border' : 'input-border'
                } rounded-md px-4 py-2 w-full`}
              />
            </div>

            <div className="my-3">
              <label htmlFor="issueDate" className="text-[#BFBFBF] text-sm block">
                Date Issued*
              </label>
              <input
                type="date"
                name="issueDate"
                value={issueDate.value}
                onChange={(e) =>
                  setIssueDate({ ...issueDate, value: e.target.value })
                }
                className={`bg-white text-[#6A6A6A] border-2 ${
                    issueDate.error ? 'error-border' : 'input-border'
                } rounded-md px-4 py-2 w-full`}
              />
            </div>

            <div className="my-3">
              <label htmlFor="issueDate" className="text-[#BFBFBF] text-sm block">
                Due Date*
              </label>
              <input
                type="date"
                name="dueDate"
                value={dueDate.value}
                onChange={(e) =>
                  setDueDate({ ...dueDate, value: e.target.value })
                }
                className={`bg-white text-[#6A6A6A] border-2 ${
                    dueDate.error ? 'error-border' : 'input-border'
                } rounded-md px-4 py-2 w-full`}
              />
            </div>

            <div className="my-3">
              <label htmlFor="totalAmount" className="text-[#BFBFBF] text-sm block">
                Total Amount*
              </label>
              <input
                type="number"
                name="totalAmount"
                value={totalAmount.value}
                onChange={(e) =>
                  setTotalAmount({ ...totalAmount, value: parseInt(e.target.value)})
                }
                className={`bg-white text-[#6A6A6A] border-2 ${
                  totalAmount.error ? 'error-border' : 'input-border'
                } rounded-md px-4 py-2 w-full`}
              />
            </div>

            <div className="my-3">
              <label htmlFor="tax" className="text-[#BFBFBF] text-sm block">
                Tax
              </label>
              <input
                type="number"
                name="tax"
                value={tax.value}
                onChange={(e) =>
                  setTax({ ...tax, value: parseInt(e.target.value) })
                }
                className={`bg-white text-[#6A6A6A] border-2 ${
                    tax.error ? 'error-border' : 'input-border'
                } rounded-md px-4 py-2 w-full`}
              />
            </div>

            <div className="my-3">
              <label htmlFor="discount" className="text-[#BFBFBF] text-sm block">
                Discount
              </label>
              <input
                type="number"
                name="discount"
                value={discount.value}
                onChange={(e) =>
                  setDiscount({ ...discount, value: parseInt(e.target.value) })
                }
                className={`bg-white text-[#6A6A6A] border-2 ${
                    discount.error ? 'error-border' : 'input-border'
                } rounded-md px-4 py-2 w-full`}
              />
            </div>

            <div className="my-3">
              <label htmlFor="discount" className="text-[#BFBFBF] text-sm block">
                Services
              </label>
              <select
                name="discount"
                onChange={(e) =>
                  console.log(e.target.value)
                }
                className={`bg-white text-[#6A6A6A] border-2 ${
                  discount.error ? 'error-border' : 'input-border'
                } rounded-md px-4 py-2 w-full`}
              >
                <option value="">select</option>
                {
                  productServices.map((service: any, index: number) => (
                    <option key={index} value={service.id}>{service.title}</option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="my-3 flex justify-center">
              <button
                onClick={() => handleSubmit()}
                className="bg-[#134FE7] hover:bg-[#1041be] text-white py-2 px-10 rounded-2xl"
              >
                  {loading ? "Processing..." : "Create"}
              </button>
          </div>
        </div>
        

        <ToastContainer />
      </>
    )
}

export default InvoiceForm;