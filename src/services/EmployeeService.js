import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = 'http://localhost:8080/api/employee';

// export function getAllTodos(){
//     return axios.get(BASE_REST_API_URL);
// }

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  
export const getAllEmployee = () => axios.get(BASE_REST_API_URL)

export const saveEmployee = (employee) => axios.post(BASE_REST_API_URL, employee)

export const getEmployee = (id) => axios.get(BASE_REST_API_URL + '/' + id)

export const updateEmployee = (id, employee) => axios.put(BASE_REST_API_URL + '/' + id, employee)

export const deleteEmployee = (id) => axios.delete(BASE_REST_API_URL + '/' + id)

