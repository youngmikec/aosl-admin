import axios from "./config";   

const url: string = "http://localhost:3000/api";

export const RETRIEVE_PRODUCT_SERVICES = async (query: string = '') => {
    let uri: string = `${url}/product-services/${query}`;
    return axios.get(uri);
}


export const CREATE_PRODUCT_SERVICE = async (data: any) => {
    let uri: string = `${url}/product-services`;
    return axios.post(uri, data);
}

export const UPDATE_PRODUCT_SERVICE = async (id: string, data: any) => {
    let uri: string = `${url}/product-services/${id}`;
    return axios.put(uri, data);
}

export const DELETE_PRODUCT_SERVICE = async (id: string) => {
    let uri: string = `${url}/product-services/${id}`;
    return axios.delete(uri);
}
