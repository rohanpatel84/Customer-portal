// import { FC, useState } from 'react';
// import GetEmail from '../../GetEmail'
// import { API, AppLink } from '../../helpers/API';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../../utils/helpers/API';

// interface ForgotProps {}

// interface MailUser {
//   email: string;
//   link: string;
// }

// const Forgot: FC<ForgotProps> = () => {
//   const [response, setResponse] = useState<{ error?: string }>({});
//   const URL: string = `${API}/forgot`;

//   const handleClick = (user: { email: string }) => {
//     if (!user.email) {
//       setResponse({ error: 'Fields are required' });
//       return;
//     }

//     const mailUser: MailUser = {
//       email: user.email,
//       link: `${AppLink}/reset`,
//     };

//     fetch(URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(mailUser),
//     })
//       .then((data) => data.json())
//       .then((data) => setResponse(data))
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="flex h-screen justify-center items-center">
//       <GetEmail handleClick={handleClick} response={response} setResponse={setResponse} />
//     </div>
//   );
// };

// export default Forgot;


interface Props {
  username: string;
  password: string;
}

const ForgotPassword: React.FC<Props> = ({ username, password }) => {
  const encodedCredentials = btoa(`${username}:${password}`);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append("_operation", "ForgotPassword");
      formdata.append("email", email);

      const requestOptions = {
        method: "POST",
        headers: {
          'Access-Control-Allow-Origin':'*',
          Authorization: `Basic ${encodedCredentials}`,
        },
        body: formdata,
      };

      const response = await fetch(API_URL, requestOptions);
      const jsonData = await response.json();
      console.log(jsonData);
      setMessage(jsonData.message);
      if(jsonData.success == true) {
        toast.success(jsonData.result, { autoClose: 3000 });
      } else {
        toast.error('Failed to send email. Please try again later.', { autoClose: 3000 });
      };
    } catch (error) {
      setError('Failed to initiate password reset. Please try again later.');
      console.error('Error:', error);
      toast.error('Failed to send email. Please try again later.', { autoClose: 3000 });
    }
  };

  return (
    <main className="w-full  max-w-md mx-auto p-6">
      <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-[#D0662E]">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
          </div>

          <div className="mt-5">
            
            <form onSubmit={handleForgotPassword}>
              <div>
                <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                <div className="relative">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    id="email"
                    name="email"
                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    aria-describedby="email-error"
                  />
                </div>
                <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
              </div>
              {message && <div>{message}</div>}
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <button type="submit" className="mt-5 py-2 px-2 inline-flex justify-center items-center gap-2 rounded-md border font-semibold bg-graydark  text-white text-sm">Reset password</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />

    </main>
  );
};

export default ForgotPassword;




