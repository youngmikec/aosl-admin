import axios, { url } from "./config";

// const url: string | undefined = process.env.REACT_APP_BASE_URL;

export const RETREIVE_NEWSLETTERS = async (query: string = "") => {
  return axios.get(`${url}/newsletters/${query}`);
};

export const CREATE_NEWLETTER = async (data: { [key: string]: any }) => {
  return axios.post(`${url}/newsletter`, data);
};

export const UPDATE_NEWSLETTER = async (
  id: string,
  data: { [key: string]: any }
) => {
  return axios.put(`${url}/newsletter/${id}`, data);
};
export const DELETE_NEWSLETTER = async (id: string) => {
  return axios.delete(`${url}/newsletter/${id}`);
};
