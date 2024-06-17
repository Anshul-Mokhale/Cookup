// PrivateRoute.tsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

interface PrivateRouteProps {
    children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { isAuthenticated } = authContext;

    if (!isAuthenticated) {
        return <Navigate to="/user/sign-in" />;
    }

    return <>{children || <Outlet />}</>;
};

export default PrivateRoute;
