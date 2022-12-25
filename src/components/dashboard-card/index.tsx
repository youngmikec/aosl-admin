import React from 'react';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import image from '../../assets/images/account-balance-bg.png';

type Props = {
    title: string;
    value: number;
    bgColor: string;
    txtColor: string;
}

const DashboardCard = ({ title, value, bgColor, txtColor }: Props) => {
    const style = {
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: bgColor,
        backgroundBlendMode: 'color',
        color: txtColor
    }

    return (
        <>
            <div className={`rounded-md flex justify-start px-3 py-5`} style={style}>
                <div>
                    <span>
                        <MdOutlinePeopleAlt />
                    </span>
                </div>
                <div className="mx-2">
                    <p>{title}</p>
                    <h1 className='text-2xl'>{value}</h1>
                </div>
            </div>
        </>
    )
}

export default DashboardCard