import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem('user');
        navigate('/login');
    }, [navigate]);

    return null;
}

export default Logout;
