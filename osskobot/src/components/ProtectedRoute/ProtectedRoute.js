import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            await axios.post(`${process.env.REACT_APP_API_ADDRESS}users/auth/token/verify/`, {
                token: Cookies.get('token')
            }).then((response) => {
                setIsLogin(true);
                setLoading(false);
            }).catch((error) => {
                setIsLogin(false);
                alert("로그인을 해주세요.");
            });
        };

        checkLoginStatus();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isLogin ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
