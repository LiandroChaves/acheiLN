'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface SignInData {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User | null;
    isAuthenticated: boolean;
    signIn: (credentials: SignInData) => Promise<void>;
    signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const isAuthenticated = !!user;

    useEffect(() => {
        const token = localStorage.getItem('@AcheiLimoeiro:token');
        const userData = localStorage.getItem('@AcheiLimoeiro:user');

        if (token && userData) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(JSON.parse(userData));
        }
    }, []);

    async function signIn({ email, password }: SignInData) {
        try {
            const response = await api.post('/users/sessions', {
                email,
                password,
            });

            const { token, user } = response.data;

            localStorage.setItem('@AcheiLimoeiro:token', token);
            localStorage.setItem('@AcheiLimoeiro:user', JSON.stringify(user));

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser(user);

            if (user.role === 'ADMIN') {
                router.push('/admin');
            } else {
                router.push('/dashboard');
            }
        } catch (err) {
            alert('Erro no login, mn. Verifica esse e-mail e senha aí!');
        }
    }

    function signOut() {
        localStorage.removeItem('@AcheiLimoeiro:token');
        localStorage.removeItem('@AcheiLimoeiro:user');
        setUser(null);
        router.push('/login');
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}