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

export const doctor_additional_info = (form, token) => apiDoctor.post(`/saveadditionalinfo`, form, {
    headers: {
        'Content-Type': 'multipart/form-data', // This is required to send form data with files
        'auth-token': `${token}`
    },
});

export const doctor_account_settings = (body, token) => apiDoctor.post(`/saveappointmentdetails`, body, {
    headers: {
        'auth-token': `${token}`
    },
});

export const patient_additional_info = (form, token) => api.post(`/savepatientsdetails`, form, {
    headers: {
        'Content-Type': 'multipart/form-data', // This is required to send form data with files
        'auth-token': `${token}`
    },
});

export const patient_medical_history = (body, token) => api.post(`/savepasthistory`, body, {
    headers: {
        'auth-token': `${token}`
    },
});

export const patient_health_report = (form, token) => api.post(`/savehealthreports`, form, {
    headers: {
        'Content-Type': 'multipart/form-data', // This is required to send form data with files
        'auth-token': `${token}`
    },
});