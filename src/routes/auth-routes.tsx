import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// pages components
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import CryptoPage from '../pages/crypto';
import Giftcard from '../pages/giftcard';
import Airtime from '../pages/airtime';
import OrdersPage from '../pages/orders';



export type RouteType = {
    path: string;
    component: ReactNode
}

const authRoutes: RouteType[] = [
    {
        path: '/',
        component: <Login />,
    },
    {
        path: '/login',
        component: <Login />,
    },
    {
        path: '/dashboard',
        component: <Dashboard />
    },
    {
        path: '/cryptos',
        component: <CryptoPage />
    },
    {
        path: '/giftcards',
        component: <Giftcard />
    },
    {
        path: '/airtime',
        component: <Airtime />
    },
    {
        path: '/orders',
        component: <OrdersPage />
    },
    
    {
        path: '*',
        component: <Navigate to="/login" />
    }
]

export default authRoutes;