import { FC } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
    children: JSX.Element;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = sessionStorage.getItem('user');

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
