
import { FC, useRef, useState, FormEvent, useEffect } from 'react';
import loginLogo from '../../images/logo/loginbg.png';
import targetLogo from '../../images/logo/targetcrm.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../../utils/helpers/API';

interface LoginProps {
    success: boolean;
    result: string;
}

const Login: FC = () => {
    const [login, setLogin] = useState<LoginProps[]>([]);
    const [input, setInput] = useState({
        username: "",
        password: ""
    });

    const username = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setInput(user);
        }
    }, [])

    const fetchData = async () => {
        const formdata = new FormData();
        formdata.append("_operation", "Ping");
        formdata.append("username", input.username);
        formdata.append("password", input.password);

        const requestOptions: RequestInit = {
            method: "POST",
            headers: {
                "Authorization": "Basic dml2ZWtAeGV4Y2VsbGVuY2UuY29tOngyM2h0bXYw'"
            },
            body: formdata,
        };

        try {
            const response = await fetch(API_URL, requestOptions);
            const jsondata = await response.json();

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setLogin(jsondata.login);
            jsondata.success = response.ok;

            if (jsondata.result === "login success") {
                console.log(input)
                sessionStorage.setItem("user", JSON.stringify(input));
                navigate("/ECommerce");

                toast.success("Login successful!", {autoClose:2000});
            } else {
                toast.error(jsondata.result, {autoClose:2000});
                setErrorMessage('Invalid username or password');

            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
            toast.error('An error occurred. Please try again.', {autoClose:2000});
        }
    };

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        fetchData();
    };

    return (
        <div>
            <div className='my-12 justify-center grid-cols-12 flex flex-wrap gap-36 max-sm:gap-12 max-md:gap-12 '>
                <div className="col-span-6 content-center">
                    <div className='max-sm:hidden max-md:hidden'>
                        <img src={loginLogo} alt='logo' className="" />
                    </div>
                    <div className='mx-20'>
                        <img src={targetLogo} alt='logo' className="" />
                    </div>
                </div>
                <div className="border border-[#D6D6D6] rounded-lg col-span-6">
                    <div className="!px-12 !py-12 card-body">
                        <div className="text-center">
                            <h4 className="mb-2 text-[#d0662e] text-2xl">Welcome <span className="font-bold">USER !</span></h4>
                            <p className="text-slate-500 dark:text-zink-200">Stay signed in with your account <br />to make searching easier</p>
                        </div>
                        <form action="#!" className="mt-10" onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="inline-block mb-2 text-base font-medium text-[#686b78] text-left">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name='username'
                                    required
                                    value={input.username}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    className="form-input border form-input dark:bg-zink-600/50 border-slate-200 dark:border-zink-500 focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 shadow appearance-none rounded w-full py-2 px-3 text-[#686b78] leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter your username"
                                    ref={username}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="inline-block mb-2 text-base font-medium text-[#686b78] text-left">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name='password'
                                    required
                                    value={input.password}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    className="form-input dark:bg-zink-600/50 border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 shadow appearance-none border rounded w-full py-2 px-3 text-[#686b78] leading-tight focus:shadow-outline"
                                    placeholder="Enter your password"
                                    ref={password}
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2"></div>
                                <Link to="/forgotpassword" className="inline-block text-base font-medium align-middle cursor-pointer text-[#d0662e]">Forgot Password?</Link>
                            </div>
                            <div className="mt-10">
                                <button
                                    type='submit'
                                    className={`border bg-[#D0662E] justify-center flex items-center rounded-3xl lg:w-80 h-10 max-lg:h-10 max-md:w-96 font-medium text-white`}>
                                    Sign In
                                </button>
                                <p className='text-red-600 font-bold text-lg text-center py-4 decoration-wavy'>{errorMessage}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
