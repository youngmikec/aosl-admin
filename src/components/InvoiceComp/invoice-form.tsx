import { useState, useEffect, FC } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import { FaPlus, FaMinus } from "react-icons/fa";


import './style.css';
import { ApiResponse, Application } from '../../models';
import { CREATE_INVOICE } from '../../service';
import { ADD_TO_INVOICES } from '../../store/invoice';
import { RETRIEVE_PRODUCT_SERVICES } from '../../service/product-services';

type Props = {
  mode: string;
  record?: Application
}

type FormGroup = {
  name: string;
  amount: number;
  quantity: number;
  totalAmount: number;
}

const InvoiceForm: FC<Props> = ({ mode, record }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [productServices, setProductServices] = useState<any[]>([]);
    const [selectedServices, setSelectedServices] = useState<any[]>([]);

    const [issueDate, setIssueDate] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [dueDate, setDueDate] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [clientName, setClientName] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [clientEmail, setClientEmail] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [clientPhone, setClientPhone] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [clientAddress, setClientAddress] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [tax, setTax] = useState<{value: number, error: boolean }>({value: 0, error: false});
    const [discount, setDiscount] = useState<{value: number, error: boolean }>({value: 0, error: false});

    const [serviceArray, setServiceArray] = useState<FormGroup[]>([
      {
        name: '',
        amount: 0,
        quantity: 1,
        totalAmount:0
      }
    ]);

    const AddFormGroup = () => {
      const formGroup: FormGroup = {
        name: '',
        amount: 0,
        quantity: 1,
        totalAmount:0
      }
      setServiceArray(prev => [...prev, formGroup ])
    }

    const RemoveFormGroup = (index: number) => {
      setServiceArray((prev: FormGroup[]) => {
        const newFormArray = prev.filter((item: FormGroup, idx: number) => idx !== index);
        const totalAmount = newFormArray.map(item => item.totalAmount).reduce((a, b) => (!Number.isNaN(b)) ? (a + b) : (a + 0));
        setTotalAmount(totalAmount);
        return newFormArray;
      });
    }

    const setFormGroupValue = (name: string, value: any, index: number) => {
      setServiceArray((prev: FormGroup[]) => {
        const newFormArray = prev.map((fg: FormGroup, idx: number, arr: FormGroup[]) => {
          if(idx === index){
            let newData: FormGroup | any = {...fg};
            if(name === 'amount' || name === 'quantity'){
              newData[`${name}`] = value;
              newData.totalAmount = (!Number.isNaN(newData.amount) && !Number.isNaN(newData.quantity)) ? (newData.amount * newData.quantity) : 0;
            }else {
              newData[`${name}`] = value;
            }
            return newData;
          }else {
            return fg;
          }
        });
        const totalAmount = newFormArray.map(item => item.totalAmount).reduce((a, b) => (!Number.isNaN(b)) ? (a + b) : (a + 0));
        setTotalAmount(totalAmount);
        return newFormArray;
      })
    }

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
        setClientPhone({ ...clientPhone, error: true });
      } else {
        setClientPhone({ ...clientPhone, error: false });
      }
      if(clientAddress.value === "" || undefined || null) {
        isValid = false;
        setClientAddress({ ...clientAddress, error: true });
      } else {
        setClientAddress({ ...clientAddress, error: false });
      }

      return isValid;
    };

    const clearFormStates = () => {
      setTotalAmount(0);
      setIssueDate({value: '', error: false});
      setDueDate({value: '', error: false});
      setClientName({value: '', error: false});
      setClientEmail({value: '', error: false});
      setClientPhone({value: '', error: false});
      setClientAddress({value: '', error: false});
      setTax({value: 0, error: false});
      setDiscount({value: 0, error: false});
      setServiceArray([
        {
          name: '',
          amount: 0,
          quantity: 1,
          totalAmount:0
        }
      ])
    }

    const handleSubmit = () => {
      if (inputCheck()) {
          setLoading(true);
          const formattedServices = serviceArray.map((item: FormGroup) => ({...item, totalAmount: (item.quantity * item.amount)}));
          const data = { 
            issueDate: issueDate.value,
            dueDate: dueDate.value,
            totalAmount: totalAmount,
            clientName: clientName.value,
            clientEmail: clientEmail.value,
            clientPhone: clientPhone.value,
            clientAddress: clientAddress.value,
            tax: tax.value,
            discount: discount.value,
            services: formattedServices
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
                <label htmlFor="name" className="text-black text-sm block">
                    Client Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={clientName.value}
                  placeholder='Enter your full name'
                  onChange={(e) =>
                    setClientName({ ...clientName, value: e.target.value })
                  }
                  className={`bg-white text-[#6A6A6A] border-2 ${
                    clientName.error ? 'error-border' : 'input-border'
                  } rounded-md px-4 py-2 w-full`}
                />
            </div>

            <div className="my-3">
                <label htmlFor="shortName" className="text-black text-sm block">
                    Client Email*
                </label>
                <input
                    type="text"
                    name="clientEmail"
                    placeholder="example@gmail.com"
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
                <label htmlFor="rate" className="text-black text-sm block">
                  Client Phone*
                </label>
                <input
                  type="text"
                  name="clientPhone"
                  placeholder='+234 881'
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
              <label htmlFor="txnNetwork" className="text-black text-sm block">
                Client Address
              </label>
              <input
                type="text"
                name="clientAddress"
                placeholder='enter your address.'
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
              <label htmlFor="issueDate" className="text-black text-sm block">
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
              <label htmlFor="issueDate" className="text-black text-sm block">
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
          </div>

          <hr />
          <div className="flex justify-between my-4">
            <h1>
              <strong>Services Included</strong>
            </h1>
            <p>
              <strong>
              Amount {totalAmount} (GBP)
              </strong>
            </p>
          </div>
            {
              serviceArray.length > 0 && serviceArray.map((row: FormGroup, idx: number) => {
                return (
                  <div 
                    key={idx} 
                    className="my-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 border-b-[1px] border-[#e3e3e3]"
                  >
                    <div className="my-3">
                      <label htmlFor="tax" className="text-black text-sm block">
                        Service
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={row.name}
                        placeholder='service name'
                        onChange={(e) =>
                          setFormGroupValue('name', e.target.value, idx)
                        }
                        className={`bg-white text-[#6A6A6A] border-2 ${
                            tax.error ? 'error-border' : 'input-border'
                        } rounded-md px-4 py-2 w-full`}
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="tax" className="text-black text-sm block">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={row.quantity}
                        onChange={(e) =>
                          setFormGroupValue('quantity', parseInt(e.target.value), idx)
                        }
                        className={`bg-white text-[#6A6A6A] border-2 ${
                            tax.error ? 'error-border' : 'input-border'
                        } rounded-md px-4 py-2 w-full`}
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="tax" className="text-black text-sm block">
                        Amount (GBP)
                      </label>
                      <input
                        type="number"
                        name="amount"
                        value={row.amount}
                        onChange={(e) =>
                          setFormGroupValue('amount', parseInt(e.target.value), idx)
                        }
                        className={`bg-white text-[#6A6A6A] border-2 ${
                            tax.error ? 'error-border' : 'input-border'
                        } rounded-md px-4 py-2 w-full`}
                      />
                    </div>

                    <div className="my-auto flex justify-center gap-2">
                      <div>
                        <button 
                          disabled={serviceArray.length <= 1}
                          onClick={() => RemoveFormGroup(idx)}
                          className="flex justify-center items-center border-[1px] border-[#1041be] rounded-lg bg-white text-[#1041be] hover:bg-[#e3e3e3] hover:text-[#1041be] py-2 px-4"
                        >
                          <FaMinus size={16} color="#1041be" />
                        </button>
                      </div>
                      {
                        (serviceArray.length === (idx + 1)) && (
                          <div>
                            <button 
                              onClick={() => AddFormGroup()}
                              className="flex justify-center items-center border-[1px] border-[#1041be] rounded-lg bg-white text-[#1041be] hover:bg-[#e3e3e3] hover:text-[#1041be] py-2 px-4"
                            >
                              <FaPlus size={16} color="#1041be" />
                            </button>
                          </div>
                        )
                      }
                    </div>
                    <hr />
                  </div>
                )
              })
            }

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