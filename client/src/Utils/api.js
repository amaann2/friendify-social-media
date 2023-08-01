import axios from "axios";
axios.defaults.withCredentials = true;

export const login = (formInput) =>
  axios.post(`/api/v1/users/login`, formInput);

export const signUp = (formInput) =>
  axios.post(`/api/v1/users/signup`, formInput);

export const load = () => axios.get(`/api/v1/users/me`);
export const logout = () => axios.get(`/api/v1/users/logout`);


export const allPost = () => axios.get("/api/v1/posts");
export const getPost = (id) => axios.get(`/api/v1/posts/${id}`);
