import { RouteType } from "./auth-routes";
import Dashboard from "../pages/dashboard";
import CryptoPage from '../pages/crypto';
import Giftcard from '../pages/giftcard';
import Airtime from '../pages/airtime';
import OrdersPage from '../pages/orders';
import UsersPage from "../pages/users";
import Account from "../pages/account";
import UserDetailPage from "../pages/user-detail";
import NewsletterPage from "../pages/newsletter";
import ApplicationPage from "../pages/application";
import JobsPage from "../pages/Jobs";
// import NotFoundPage from "../pages/Not-found";

const privateRoutes: RouteType[] = [
    {
        path: '/dashboard',
        component: <Dashboard />
    },
    {
        path: '/profile',
        component:<Account />
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
        path: '/jobs',
        component: <JobsPage />
    },
    {
        path: '/job-application',
        component: <ApplicationPage />
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
        path: '/users',
        component: <UsersPage />
    },
    {
        path: '/users/:id',
        component: <UserDetailPage />
    },
    {
        path: '/newsletter',
        component: <NewsletterPage />
    },
    // {
    //     path: '*',
    //     component: <NotFoundPage/>
    // },
    
];

export default privateRoutes;