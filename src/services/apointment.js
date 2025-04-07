import axios from 'axios';
import { API_URL } from '../constant';

const api = axios.create({
    baseURL: `${API_URL}/user`,
});

const apiDoctor = axios.create({
    baseURL: `${API_URL}/doctor`,
});

export const getSerchedResult = (page, query) => api.get(`/getalldoctors?page=${page}&limit=10${query !== "" ? `&specialization=${query}` : ''}`);

export const getDoctorDetails = (id) => api.get(`/getappoinmentdetails/${id}`);

export const freeze_appointment = (body, token) => api.post(`/freezeappointment`, body, {
    headers: {
        'Content-Type': 'application/json',
        'auth-token': `${token}`
    },
});