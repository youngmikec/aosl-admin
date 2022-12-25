import React, { useState } from 'react';

// style
// import "./style.css";
import Card from "../../shared/card";
import DashboardCard from '../dashboard-card';

const DashboardComp = () => {
    const [searching, setSearching] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    
    const handleSearchQuery = () => {
        setSearching(true);
        // if(searchQuery !== '') {
        //     const filteredResults: CryptoCurrency[] = cryptos.filter((item: CryptoCurrency) => Object.values(item).includes(searchQuery));
        //     setCryptos(filteredResults);
        //     setSearching(false);
        // }else {
        //     setCryptos(cryptoCurrencies);
        //     setSearching(false);
        // }
    }

    return (
        <>
            <div 
                className='grid 
                    grid-cols-1 space-y-2
                    sm:grid-cols-2 sm:space-x-2 sm:space-y-2
                    md:grid-cols-2 md:space-x-2 md:space-y-2
                    lg:grid-cols-4 lg:space-x-3 lg:space-y-0'
            >
                <div>
                    <DashboardCard title='Total Visitors' value={1123} bgColor="#8652a49a" txtColor='#ffffff' />
                </div>
                <div>
                    <DashboardCard title='Total Visitors' value={1123} bgColor="#ffffff" txtColor='#8652A4' />
                </div>
                <div>
                    <DashboardCard title='Total Visitors' value={1123} bgColor="#ff6702b9" txtColor='#ffffff' />
                </div>
                <div>
                    <DashboardCard title='Total Visitors' value={1123} bgColor="#ffffff" txtColor='#8652A4' />
                </div>
                        
            </div>

            <section className='mt-8 mb-4'>
                <h4 className='text-xl text-[#8652a4] font-bold'>Recent Orders</h4>
            </section>

            <section>
                <Card type='sm'>
                    {/* Title section */}
                    <div id="title">
                        <div className="flex justify-between w-full">
                            <div className='mb-8'>
                                <h3 className='text-[#8652A4] text-xl mb-1'>Orders Records Table</h3>
                                <p className='text-[#7F7F80] text-sm'>Displaying 3 of 3 Order Record(s)</p>
                            </div>

                            
                            <div>
                                <div className='border-2 border-[#ececec] flex justify-start w-max rounded-md'>
                                    <input 
                                        type="text" 
                                        className='lg:w-80 px-3 py-1'
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button 
                                        className='bg-[#8652A4] text-white text-sm px-6 py-2 rounded-md'
                                        onClick={() => handleSearchQuery()}
                                    >
                                        { searching ? 'searching...' : 'Search' }
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* Title section */}
                </Card>
            </section>
        </>
    )
}

export default DashboardComp;