import React from 'react'
import { BsFillCaretDownFill } from 'react-icons/bs';

type Props = {
    sortData: (item: string) => any;
}

const SortComp = ({ sortData }: Props) => {
  return (
    <>
        <div className='relative w-max text-[#7F7F80] text-sm py-1 px-4 border-2 border-[#ececec] group rounded-md'>
            <span className='mx-1 inline-block'>sort by type</span>
            <span className='mx-1 inline-block'> <BsFillCaretDownFill /> </span>

            <ul className=" absolute -left-1 -top-3 mt-10 p-2 rounded-lg shadow-lg bg-[#F6F6F6] z-0 hidden group-hover:block">
                <li className="hover:bg-[#8652A4] hover:cursor-pointer pr-10 p-1 whitespace-no-wrap hover:text-white rounded-md text-sm md:text-base ">
                <span
                    className="items-left px-2 py-3"
                    onClick={() => sortData("createdAt")}
                >
                    By Date
                </span>
                </li>
                <li className="hover:bg-[#8652A4] hover:cursor-pointer pr-10 p-1 whitespace-no-wrap rounded-md hover:text-white text-sm md:text-base ">
                <span
                    className="items-left px-2 py-2"
                    onClick={() => sortData("name")}
                >
                    Alphabetically
                </span>
                </li>
            </ul>
        </div>
    </>
  )
}

export default SortComp