import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Login from "../pages/login";



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
        path: '*',
        component: <Navigate to="/login" />
    }
]

export default authRoutes;