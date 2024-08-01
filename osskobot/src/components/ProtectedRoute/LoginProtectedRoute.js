import React from 'react';
import { Navigate } from 'react-router-dom';
import cookies from 'js-cookie';

const LoginProtectedRoute = ({ children }) => {
    const token = cookies.get('token');
    if (!!token) {
        return <Navigate to="/" />;
    }
    return children;
};

export default LoginProtectedRoute;
