import React from 'react';
import { Navigate } from 'react-router-dom';
import { getItem } from '../utils';

type Props = {
	children: any
};

const ProtectedRoute = ({ children }: Props) => {
    
	const clientToken = getItem('clientToken');
	if (clientToken) {
		return children;
	}
	return <Navigate to={'/'} replace />;
};


export  const NotProtectedRoute = ({children}:Props)=>{
    const clientToken = getItem('clientToken');
    if(clientToken){
        return <Navigate to={'/dashboard'} replace />;
    }
    return children;
}

export default ProtectedRoute;