import { RouteType } from "./auth-routes";
import Dashboard from "../pages/dashboard";
import OrdersPage from '../pages/orders';
import UsersPage from "../pages/users";
import Account from "../pages/account";
import UserDetailPage from "../pages/user-detail";
import NewsletterPage from "../pages/newsletter";
import ApplicationPage from "../pages/application";
import JobsPage from "../pages/Jobs";
import ChatPage from "../pages/chat";
import InvoicePage from "../pages/invoices";
import CreateInvoicePage from "../pages/invoices/Create-Invoice-page";
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
        path: '/chats',
        component: <ChatPage />
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
        path: '/orders',
        component: <OrdersPage />
    },
    {
        path: '/invoices',
        component: <InvoicePage />
    },
    {
        path: '/invoices/create',
        component: <CreateInvoicePage />
    },
    {
        path: '/invoices/edit/:id',
        component: <CreateInvoicePage />
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