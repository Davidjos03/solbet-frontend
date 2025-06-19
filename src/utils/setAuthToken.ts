import { BACKEND_URL } from "@/constants/envConstants";

// authToken.ts
let authToken = '';

export const setAuthToken = (token: string) => {
    if (token) {
        authToken = token;
        localStorage.setItem('token', token);
    } else {
        authToken = '';
        localStorage.removeItem('token');
    }
};

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = authToken || localStorage.getItem('token');

    const headers = new Headers(options.headers || {});
    headers.set('Content-Type', 'application/json');

    if (token) {
        headers.set('x-auth-token', token);
    }

    const response = await fetch(`${BACKEND_URL}${url}`, {
        ...options,
        headers,
        credentials: 'include' // if using cookies
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Request failed');
    }

    return response.json();
};