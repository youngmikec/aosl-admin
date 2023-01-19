import axios, { url } from "./config";
// axios.defaults.withCredentials = true;

// const url: string = "http://localhost:3000/api";

export const RETRIEVE_USERS = async () => {
  return axios.get(`${url}/users`);
};

export const RETRIEVE_USER_BY_ID = async (id: string) => {
  return axios.get(`${url}/users/?_id=${id}`);
};

export const RETRIEVE_PROFILE = async () => {
  return axios.get(`${url}/users/me`);
};

export const UPDATE_PROFILE = async (data: {[key: string]: any}) => {
  return axios.put(`${url}/user/me/update`, data);
};


export const LOGIN = async (data: any) => {
  const payload = { ...data };
  return axios.post(`${url}/admin/login`, payload, {
    headers: {},
  });
};

export const UPDATE_USER_BY_ADMIN = async (id: string, data: any) => {
  const payload = { ...data };
  return axios.post(`${url}/user/admin/${id}`, payload, {
    headers: {},
  });
};

export const UPDATE_USER_BY_SELF = async (data: any) => {
  const payload = { ...data };
  return axios.post(`${url}/user/me`, payload, {
    headers: {},
  });
};

export const VERIFY_EMAIL = async (payload: any) => {
  return axios.post(`${url}/users/verify`, payload);
};

export const VERIFY_RESETCODE = async (payload: any) => {
  return axios.post(`${url}/users/resetCode/verify`, payload);
};

export const RETRIEVE_USER_PROFILE = async () => {
  return axios.get(`${url}/users/me`);
};

export const USER_PROFILE_VERIFY = async (data: FormData) => {
  return axios.post(`${url}/profile/verify`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const DELETE_USER = async (id: string = '') => {
  return axios.delete(`${url}/user/${id}`);
};
