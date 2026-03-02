import axios, { AxiosError } from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('@AcheiLimoeiro:token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para capturar erros de resposta (como o 401)
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Se cair aqui, o token já era ou é inválido
            if (typeof window !== 'undefined') {
                localStorage.removeItem('@AcheiLimoeiro:token');
                localStorage.removeItem('@AcheiLimoeiro:user');

                // Redireciona para a home ou login
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export { api };