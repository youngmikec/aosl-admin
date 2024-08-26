import axios, { url } from "./config";  

// const url: string = "http://localhost:3000/api";

export const RETRIEVE_INVOICES = async (query: string = '') => {
    let uri: string = `${url}/invoice/getInvoices/${query}`;
    return axios.get(uri);
}

export const RETRIEVE_INVOICES_PUBLIC = async (query: string = '') => {
    let uri: string = `${url}/invoice/getInvoices/${query}`;
    return axios.get(uri);
}

export const CREATE_INVOICE = async (data: any) => {
    let uri: string = `${url}/invoice/createInvoice`;
    return axios.post(uri, data);
}

export const UPDATE_INVOICE = async (id: string, data: any) => {
    let uri: string = `${url}/invoice/updateInvoice/${id}`;
    return axios.put(uri, data);
}

export const DELETE_INVOICE = async (id: string) => {
    let uri: string = `${url}/invoice/deleteInvoice/${id}`;
    return axios.delete(uri);
}
