import React, { useState, useEffect } from 'react'; 

export type TableHeader = {key: string, value: string};

type Props = {
    tableHeaders?: Array<TableHeader>,
    tableRows?: any[],
}

const AppTable = ({ tableHeaders, tableRows }: Props) => {
    const [tableRecords, setTableRecords] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');

    const handleSearch = (searchValue: string) => {
        if(searchValue === ''){
            if(tableRows) setTableRecords(tableRows);
            return;
        }
        if(searchValue !== ''){
            const filteredArr:any[] =  tableRecords.filter((item) => {
                // Convert all values to strings and check if any value includes the searchValue
                for (const key in item) {
                  if (String(item[key]).toLowerCase().includes(searchValue.toLowerCase())) {
                    return true;
                  }
                }
                return false;
              });
            setTableRecords(filteredArr);
        }
    }

    useEffect(() => {
        if(tableRows) setTableRecords(tableRows);
    }, [tableRows]);
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex justify-center ml-16 md:justify-end">
                    <div className="pb-4 bg-white dark:bg-gray-900">
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input 
                                type="text" 
                                id="table-search"
                                value={searchValue}
                                onChange={(e) => {
                                    setSearchValue(e.target.value)
                                    handleSearch(e.target.value)
                                }}
                                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="search records" 
                            />
                        </div>
                    </div>
                </div>

                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {
                                tableHeaders && tableHeaders.map((item: TableHeader, idx: number) => {
                                    return (
                                        <th scope="col" key={idx} className={`${idx === 1 ? 'p-4' : 'px-6 py-3'}`}>
                                            { item.value }
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableRecords ? tableRecords.map((row: any, i: number) => {
                                return (
                                    <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        {
                                            tableHeaders?.map((item: TableHeader, col: number) => {
                                                return (
                                                    <td className="w-4 p-4" key={col}>
                                                        { row[item.key]}
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            }) :
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className={`w-4 p-4 text-center ${tableHeaders && `cols-[${tableHeaders.length}]`}`}>
                                    No Record
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AppTable;