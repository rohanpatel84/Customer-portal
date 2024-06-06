import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo47 from '../images/cards/Group 47.png';
import logo48 from '../images/cards/Group 48.png';
import logo49 from '../images/cards/Group 49.png';
import logo50 from '../images/cards/Group 50.png';

type UserDataProps = {
    Users: { count: string },
    HelpDesk: { count: string },
    Quotes: { count: string },
    Invoice: { count: string },
};

interface Props {
    username: string;
    password: string;
}

const UserCard: React.FC<Props> = ({ username, password }) => {
    const encodedCredentials = btoa(`${username}:${password}`);
    const [UserData, setUserData] = useState<UserDataProps[]>([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        const formdata = new FormData();
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            formdata.append("username", user.username);
            formdata.append("password", user.password);
        }
        formdata.append('_operation', 'FetchMainDashboard');
        formdata.append('mode', 'FetchMainDashboard');

        const requestOptions = {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: `Basic ${encodedCredentials}`,
            },
            body: formdata,
        };

        try {
            const response = await fetch('https://cms.excellcons.com/modules/CustomerPortal/api.php', requestOptions);
            const jsondata = await response.json();
            setUserData([jsondata.result]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <div className='rounded-2xl border border-stroke bg-white shadow-default py-6 px-7.5 cursor-pointer' onClick={() => handleNavigation('/tickets')}>
                    <div className='flex gap-8'>
                        <div className="left-logo flex">
                            <img src={logo47} alt="Tickets Logo" />
                        </div>
                        <div className="tickets-container">
                            {UserData.map((value, index) => (
                                <h1 key={index} className='text-2xl text-[#44546F] font-bold'>{value.HelpDesk.count}</h1>
                            ))}
                            <h3 className='text-[#44546F] text-xl font-normal'>Tickets</h3>
                        </div>
                    </div>
                </div>

                <div className='rounded-2xl border border-stroke bg-white shadow-default py-6 px-7.5 cursor-pointer' onClick={() => handleNavigation('/invoices')}>
                    <div className='flex gap-8'>
                        <div className="left-logo flex">
                            <img src={logo48} alt="Invoices Logo" />
                        </div>
                        <div className="tickets-container">
                            {UserData.map((value, index) => (
                                <h1 key={index} className='text-2xl text-[#44546F] font-bold'>{value.Invoice.count}</h1>
                            ))}
                            <h3 className='text-[#44546F] text-xl font-normal'>Invoices</h3>
                        </div>
                    </div>
                </div>

                <div className='rounded-2xl border border-stroke bg-white shadow-default py-6 px-7.5 cursor-pointer' onClick={() => handleNavigation('/users')}>
                    <div className='flex gap-8'>
                        <div className="left-logo flex">
                            <img src={logo50} alt="Users Logo" />
                        </div>
                        <div className="tickets-container">
                            {UserData.map((value, index) => (
                                <h1 key={index} className='text-2xl text-[#44546F] font-bold'>{value.Users.count}</h1>
                            ))}
                            <h3 className='text-[#44546F] text-xl font-normal'>Users</h3>
                        </div>
                    </div>
                </div>

                <div className='rounded-2xl border border-stroke bg-white shadow-default py-6 px-7.5 cursor-pointer' onClick={() => handleNavigation('/quotes')}>
                    <div className='flex gap-8'>
                        <div className="left-logo flex">
                            <img src={logo49} alt="Quotes Logo" />
                        </div>
                        <div className="tickets-container">
                            {UserData.map((value, index) => (
                                <h1 key={index} className='text-2xl text-[#44546F] font-bold'>{value.Quotes.count}</h1>
                            ))}
                            <h3 className='text-[#44546F] text-xl font-normal'>Quotes</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
