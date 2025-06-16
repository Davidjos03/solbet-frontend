import { BACKEND_URL } from '@/components/constants';
import axios from 'axios';

const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;