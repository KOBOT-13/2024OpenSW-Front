import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_ADDRESS}users/auth/token/verify/`, {
                    token: Cookies.get('token')
                });

                if (response.status === 200) {
                    setIsLogin(true);
                } else {
                    setIsLogin(false);
                }
            } catch (error) {
                setIsLogin(false);
            } finally {
                setLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isLogin ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
