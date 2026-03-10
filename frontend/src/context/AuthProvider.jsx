import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout as logoutAction, setLoading as setAuthLoading } from '../store/slices/authSlice';
import AuthContext from "./AuthContext";




export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            dispatch(loginSuccess({ user: userData, token }));
        }
        setLoading(false);
    }, [dispatch]);

    const loginWithOTP = async (email) => {
        dispatch(setAuthLoading());
        return axios.post('http://localhost:5000/api/auth/login', { email });
    };

    const registerWithOTP = async (username, email) => {
        dispatch(setAuthLoading());
        return axios.post('http://localhost:5000/api/auth/register', { username, email });
    };

    const verifyOTP = async (email, otp) => {
        dispatch(setAuthLoading());
        const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
        const { token, user: userData } = res.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));

        setUser(userData);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        dispatch(loginSuccess({ user: userData, token }));
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        dispatch(logoutAction());
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginWithOTP, registerWithOTP, verifyOTP, logout }}>
            {children}
        </AuthContext.Provider>
    );


};
