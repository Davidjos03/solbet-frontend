import api from './auth';

// store our JWT in LS and set axios headers if we do have a token

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setAuthToken = (token: any) => {
    if (token) {
        api.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token);
    } else {
        delete api.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token');
    }
};

export default setAuthToken;