import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError, AxiosResponse } from 'axios';

import './style.css';
import logo from '../../assets/images/logo.png';
import { LOGIN, WELCOME_ROUTE } from '../../service';
import { ApiResponse } from '../../models';
import { setItem } from '../../utils';

//icons
import { FiEyeOff, FiEye } from 'react-icons/fi';

const LoginComp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [pDisplay, setPDisplay] = useState<boolean>(false);
    const [email, setEmail] = useState<{value: string, error: boolean}>({value: '', error: false});
    const [password, setPassword] = useState<{value: string, error: boolean}>({value: '', error: false});

    const inputCheck = (): boolean => {
        let isValid: boolean = true;
        if(email.value === '' || undefined || null){
            isValid = false;
            setEmail({...email, error: true});
        }else{
            setEmail({...email, error: false});
        }
        if(password.value === '' || undefined || null){
            isValid = false;
            setPassword({...password, error: true});
        }else{
            setPassword({...password, error: false})
        }
        return isValid;
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

    const handleLogin = () => {
        setLoading(true);
        if(inputCheck()){
            const data = { email: email.value, password: password.value};

            LOGIN(data).then((res: AxiosResponse<ApiResponse>) => {
                const { success, message, payload } = res.data;
                if(success){
                    setLoading(false);
                    notify('success', message);
                    setItem('clientToken', payload.token);
                    setItem('clientD', payload.user);
                    // <Navigate to="/dashboard" />
                    window.location.href = '/dashboard';
                }
            }).catch((err: any) => {
                setLoading(false);
                const { message } = err.response.data;
                // notify err
                notify('error', message);
            })
        }
    }

    const checkServerHealth = () => {
        WELCOME_ROUTE().then().catch((error: AxiosError) => notify('error', error.message))
    }

    const togglePasswordDisplay = () => {
        setPDisplay(!pDisplay);
    }

    useEffect(() => {
        checkServerHealth()
    }, []);

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
                <div className='flex-1'>
                    <div className="flex justify-start mb-4">
                        <div>
                            <Link to='/'>
                                <img src={logo} alt="logo" width="120px" height="120px" />
                            </Link>
                        </div>
                    </div>

                    <div className="mx-auto w-10/12 mt-16">  
                        <h1 className='text-3xl font-bold mb-4'>Welcome Back</h1>

                        <div className='my-6'>
                            <label htmlFor="email" className='font-bold text-gray-400'>Email</label>
                            <div className={email.error ? 'error-border rounded-md' : 'input-border rounded-md'}>
                                <input 
                                    type="email" 
                                    value={email.value}
                                    onChange={(e) => setEmail({...email, value: e.target.value})}
                                    className='w-full border-0 px-4 py-2 text-gray-400' 
                                    placeholder='please enter your email' 
                                />
                            </div>
                        </div>

                        <div className='my-6'>
                            <label htmlFor="password" className='font-bold text-gray-400'>Password</label>
                            <div className={password.error ? 'error-border rounded-md' : 'input-border rounded-md'}>
                                <div className='flex' >
                                    <input 
                                        type={ pDisplay ? 'text' : 'password' } 
                                        value={password.value}
                                        onChange={(e) => setPassword({...password, value: e.target.value})}
                                        className='w-full border-none px-4 py-2 text-gray-400 grow' 
                                        placeholder='please enter your password' 
                                    />
                                    <span className='mx-2 p-2 my-auto text-gray-400 text-lg' onClick={() => togglePasswordDisplay() }>
                                        {
                                            pDisplay ? <FiEyeOff /> : <FiEye />
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between my-4">
                            <div>
                                <input type="checkbox" name="" id="" />
                                <span className='text-[#134FE7] text-sm mx-3 font-semibold'>Remember me</span>
                            </div>
                            <p className='text-[#134FE7] text-sm font-semibold'>
                                <Link to="/forgot-password">
                                    Forgot Password?
                                </Link>
                            </p>
                        </div>

                        <div className="w-8/12 my-4 mx-auto text-center">
                            <button 
                                onClick={() => handleLogin() } 
                                className='bg-[#134FE7] text-white mb-6 block w-full rounded-lg py-4'
                            >
                                { loading ? 'Processing...' : "Sign in" }
                            </button>
                        </div>
                    </div>
                </div>

                <div className='hidden md:block lg:block auth-bg flex-1'></div>
            </div>

            <ToastContainer />
        </>
    )
}

export default LoginComp;