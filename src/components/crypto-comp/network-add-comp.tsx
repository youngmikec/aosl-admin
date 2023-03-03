import React, { useState } from 'react';
import { Network } from '../../models';

type Props = {
    networks: Network[],
    addFunc: (data: any) => any,
    removeFunc: (name: string) => any
}

const NetworkAddComp = ({ networks, addFunc, removeFunc }: Props) => {
    const [networkName, setNetworkName] = useState<{value: string, error: boolean }>({value: '', error: false});
    
    const cInputCheck = (): boolean => {
        let isValid: boolean = true;
        if (networkName.value === "" || undefined || null) {
          isValid = false;
          setNetworkName({ ...networkName, error: true });
        } else {
          setNetworkName({ ...networkName, error: false });
        }
        
        return isValid;
    };

    const handleAddNetwork = () => {
        if(cInputCheck()){
            const data = {
                networkName: networkName.value,
            }
            addFunc(data);
        }
        setNetworkName({value: '', error: false});
    }

    return (
        <>
            <div className="mb-3 w-full">
                <label htmlFor="cryptoImage" className="text-[#BFBFBF] text-sm block">
                    Networks
                </label>
                <div
                    className='
                        border-2 rounded-md my-3 h-60 w-full
                        border-[#BFBFBF]
                        px-1 py-2
                    '
                >
                    <div className='flex justify-start'>
                        <div>
                            <div className="my-1 mx-2">
                                <label htmlFor="networkName" className="text-[#BFBFBF] text-sm block">
                                    Network Name*
                                </label>
                                <input
                                    type="text"
                                    name="networkName"
                                    value={networkName.value}
                                    onChange={(e) =>
                                        setNetworkName({ ...networkName, value: e.target.value })
                                    }
                                    className={`bg-white text-[#6A6A6A] border-2 ${
                                        networkName.error ? "border-red-500" : "border-[#BFBFBF]"
                                    } rounded-md px-4 py-1 w-full`}
                                />
                            </div>
                        </div>


                        <div className="mb-4 mt-6 mx-2">
                            <button 
                                className="bg-[#4e965a] text-white py-1 px-5 rounded-2xl"
                                onClick={() => handleAddNetwork()}
                            >Add</button>
                        </div>
                    </div>

                    <div className="mt-3 grid grid-cols-3">
                        {
                            networks.length > 0 && 
                            networks.map((item: Network, key) => {
                                return <div className='mx-2 my-1' key={key}>
                                    <div
                                        className="bg-[#e9e9e9] text-[#9c9c9c] py-1 px-5 rounded-2xl flex justify-between"
                                    >
                                        <span>{ item.networkName }</span> 
                                        <span className='ml-3 cursor-pointer' onClick={() => removeFunc(item.networkName) }>X</span>
                                    </div>
                                    
                                </div>
                            })
                        }
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default NetworkAddComp