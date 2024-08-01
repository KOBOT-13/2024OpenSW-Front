import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {privateAxios} from '../../services/axiosConfig';
import Cookies from 'js-cookie';
import refreshToken from '../../services/refreshToken';

const ProtectedRoute = ({ setReload, children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    console.log(setReload);
    useEffect(() => {
        const token = Cookies.get('token');

        const checkLoginStatus = async () => {
            await privateAxios.post(`users/auth/token/verify/`, {
                token: token
            }).then((response) => {
                setIsLogin(true);
                setLoading(false);
            }).catch((error) => {
                refreshToken();
                setIsLogin(true);
                setLoading(false);
            });
        };

        if(token){
            checkLoginStatus();
        }
        else{
            alert("로그인을 해주세요.");
            navigate('/login');
            setIsLogin(false);
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isLogin ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
