import axios from 'axios';
import { API_URL } from '../constant';

const api = axios.create({
    baseURL: `${API_URL}/user`,
});

const apiDoctor = axios.create({
    baseURL: `${API_URL}/doctor`,
});

export const create_user = (email, password) => api.post(`/create-user`, {
    email: email,
    password: password
});

export const create_doctor = (email, password) => apiDoctor.post(`/create-doctor`, {
    email: email,
    password: password
});

export const login = (email, password) => api.post(`/login`, {
    email: email,
    password: password
});

export const verify_user_otp = (email, password, otp) => api.post(`/verify-otp`, {
    email: email,
    password: password,
    otp: otp
});

export const verify_doctor_otp = (email, password, otp) => apiDoctor.post(`/verify-otp`, {
    email: email,
    password: password,
    otp: otp
});