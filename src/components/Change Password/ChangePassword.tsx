import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SumbitLogo from '../../images/Button/Vector.png';
import { API_URL } from '../../utils/helpers/API';
// import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

interface Props {
  username: string;
  password: string;
}

const ChangePassword: React.FC<Props> = ({ username, password }) => {

  const encodedCredentials = btoa(`${username}:${password}`);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  // const navigate = useNavigate();


  // const isLoggedIn = () => {
  //   const storedUser = sessionStorage.getItem("user");
  //   return !!storedUser;
  // };

  // useEffect(() => {
  //   if (!isLoggedIn()) {
  //     navigate('/login');
  //   }
  // }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.password === oldPassword) {
          const formdata = new FormData();
          formdata.append("_operation", "ChangePassword");
          formdata.append("username", "rp7611456@gmail.com");
          formdata.append("password", oldPassword);
          formdata.append("newPassword", newPassword);

          const requestOptions = {
            method: "POST",
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Authorization': `Basic ${encodedCredentials}`,
            },
            body: formdata,
          };

          const response = await fetch(API_URL, requestOptions);
          const jsonData = await response.json();
          console.log(jsonData);
          toast.success('Password changed successfully!', { autoClose: 3000 });
          // navigate('/changepassword')
        } else {
          setError('Old password is incorrect');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to change password. Please try again later.', { autoClose: 3000 });
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="ChangePassword" />
      <div className='flex justify-center'>
        <form onSubmit={handleChangePassword} className='w-[40%] border rounded-lg border-slate-200 p-6'>
          <h4 className="text-xl font-bold text-[#D0662E] dark:text-white">Change Password</h4>
          <div className="mb-3 mt-3">
            <label htmlFor="oldPassword" className="font-semibold text-[#353535] inline-block mb-1 text-base text-left">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="border border-stroke bg-white h-12 rounded-lg form-input dark:bg-zink-600/50  dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 dark:text-slate-500 dark:text-zink-100 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200  appearance-none w-full py-2 px-3 text-[#686b78] leading-tight"
              placeholder="Enter your Old Password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="inline-block mb-1 text-base font-semibold text-[#353535] text-left">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-stroke bg-white h-12 rounded-lg form-input dark:bg-zink-600/50  dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 dark:text-slate-500 dark:text-zink-100 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200  appearance-none w-full py-2 px-3 text-[#686b78] leading-tight"
              placeholder="Enter your New Password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="inline-block mb-1 text-base font-semibold text-[#353535] text-left">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-stroke bg-white h-12 rounded-lg form-input dark:bg-zink-600/50  dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 dark:text-slate-500 dark:text-zink-100 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200  appearance-none w-full py-2 px-3 text-[#686b78] leading-tight"
              placeholder="Confirm your Password"
            />
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {/* <button
            type="submit"
            className="border border-[#D0662E] rounded-3xl flex items-center font-medium text-white justify-center bg-graydark lg:w-50 h-10 max-lg:h-10 max-md:w-96"
          >
            Change Password
          </button> */}
          <button type="submit" className='w-35 h-10 rounded-lg bg-[#D0662E] flex text-center items-center justify-center gap-3'>
            <img src={SumbitLogo} alt="Submit" />
            <span className='text-white'>Submit</span>
          </button>
        </form>
      </div>
      <ToastContainer />
    </DefaultLayout>
  );
};

export default ChangePassword;
