import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

import logo from '../../assets/images/logo.png';
import googleIcon from '../../assets/icons/google-icon.png';
import './style.css';

const LoginComp = () => {
    const url: any = process.env.REACT_APP_BASE_URL || '';
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

    const handleLogin = () => {
        if(inputCheck()){
            const data = { email: email.value, password: password.value};

            axios.post(`${url}/login`, data).then((res: any) => {
                console.log(res);
                <Navigate to="/dashboard" />
            }).catch((err: any) => {
                console.log(err)
            })
        }
    }

    return (
        <>
            <div className='flex justify-between'>
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
                                <input 
                                    type="password" 
                                    value={password.value}
                                    onChange={(e) => setPassword({...password, value: e.target.value})}
                                    className='w-full border-0 px-4 py-2 text-gray-400' 
                                    placeholder='please enter your password' />
                            </div>
                        </div>

                        <div className="flex justify-between my-4">
                            <div>
                                <input type="checkbox" name="" id="" />
                                <span className='text-[#8652A4] text-sm mx-3 font-semibold'>Remember me</span>
                            </div>
                            <p className='text-[#8652A4] text-sm font-semibold'>
                                <Link to="/forgot-password">
                                    Forgot Password?
                                </Link>
                            </p>
                        </div>

                        <div className="w-8/12 my-4 mx-auto text-center">
                            <button 
                                onClick={() => handleLogin() } 
                                className='bg-[#8652A4] text-white mb-6 block w-full rounded-lg py-4'
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>

                <div className='auth-bg flex-1'></div>
            </div>
        </>
    )
}

export default LoginComp;