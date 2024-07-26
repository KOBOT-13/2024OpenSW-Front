import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);

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
                    alert('로그인을 해주세요.');
                }
            } catch (error) {
                setIsLogin(false);
                alert('로그인을 해주세요.');
            }
        };

        checkLoginStatus();
    }, []);

    return isLogin ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
