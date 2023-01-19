import React, { useState, useEffect } from 'react';

import { Step } from '../../models';
import AccountStepHeader from '../../shared/account-step-header';

// components
import AccountSecurity from './security';
import AccountProfile from './account-profile';
import ActivityLog from './activity-log';


const AccountComp = () => {
    const accountSettingSteps: Step[] = [
        {
            title: 'Profile',
            isActive: true
        },
        {
            title: 'Security',
            isActive: false
        },
        // {
        //     title: 'Activity log',
        //     isActive: false
        // },
    ]
    const [steps, setSteps] = useState<any[]>(accountSettingSteps)
    const [step, setStep] = useState<number>(1);

    const reformatSteps = (step: number) => {
        accountSettingSteps.forEach((item: any, idx) => {
            if(idx === (step - 1)){
                item.isActive = true
            }else{
                item.isActive = false;
            }
        })
        setSteps(accountSettingSteps);
    }

    useEffect(() => {
        reformatSteps(step);
    }, [step])

    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2'>
                <div className='w-12/12'>
                    <AccountStepHeader 
                        title='Account Settings'
                        steps={steps}
                        changeStep={setStep}
                    />

                    <div className='mt-8'>
                        <div className='bg-[#d9d9d92d] rounded-b-xl pt-5 pb-8'>
                            {
                                step === 1 && 
                                <AccountProfile />
                            }
                            {
                                step === 2 && 
                                <AccountSecurity />
                            }
                            {
                                step === 3 && 
                                <ActivityLog />
                            }
                        </div>
        
                        
                    </div>
                </div>

                <div>

                </div>
            </div>
        </>
    )
}

export default AccountComp;