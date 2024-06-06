import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import UserOne from '../../images/user/user-01.png';
import ChangePasswordLogo from '../../images/changepassword/Glyph_ undefined.svg';

type ProfileProps = {
  salutationtype: string;
  firstname: string;
  contact_no: string;
  phone: string;
  lastname: string;
  mobile: string;
  account_id: string;
  homephone: string;
  leadsource: string;
  otherphone: string;
  title: string;
  fax: string;
  department: string;
  birthday: string;
  email: string;
  contact_id: string;
  assistant: string;
  secondaryemail: string;
  assistantphone: string;
  donotcall: string;
  emailoptout: string;
  reference: string;
  notify_owner: string;
  createdtime: string;
  modifiedtime: string;
  modifiedby: string;
  portal: string;
  support_start_date: string;
  support_end_date: string;
  mailingstreet: string;
  otherstreet: string;
  mailingcity: string;
  othercity: string;
  mailingstate: string;
  otherstate: string;
  mailingzip: string;
  otherzip: string;
  mailingcountry: string;
  othercountry: string;
  mailingpobox: string;
  otherpobox: string;
  imagename: string;
  description: string;
  isconvertedfromlead: string;
  source: string;
  starred: string;
  tags: string;
  portal_designation: string;
  id: string;
  label: string;
  imagedata: null;
  imagetype: null;
};

const DropdownUser: React.FC = () => {
  const [user, setUser] = useState<ProfileProps[]>([]);
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();
  

  const getUserName = () => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(`${user.salutationtype} ${user.firstname} ${user.lastname}`);
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  const fetchData = async () => {
    const formdata = new FormData();
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      formdata.append('username', user.username);
      formdata.append('password', user.password);
    }
    formdata.append('_operation', 'FetchProfile');

    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': "Basic dml2ZWtAeGV4Y2VsbGVuY2UuY29tOmFwZGVmbWNz'"
      },
      body: formdata,
    };

    try {
      const response = await fetch('https://cms.excellcons.com/modules/CustomerPortal/api.php', requestOptions);
      const jsondata = await response.json();
      setUser([jsondata.result.customer_details]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const handleChangePassword = () => {
    navigate('/ChangePassword');
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  const getFirstLetters = (name: string): string => {
    const words = name.split(' ');
    let result = '';
    for (let i = 0; i < 2 && i < words.length; i++) {
      result += words[i].charAt(0).toUpperCase();
    }
    return result;
  };

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        {user.map((value, index) => (
          <span key={index} className="hidden text-right lg:block">
            <span className="block text-sm font-medium text-black dark:text-white">
              {value.salutationtype}&nbsp;{value.label}
            </span>
            <span className="block text-xs">{value.title}</span>
          </span>
        ))}
        {user.map((value, index) => (
        <span key={index} className="h-12 w-12 bg-[#D0662E]  font-bold rounded-full flex items-center justify-center bg-gray-200 text-black">
          <span className='text-white'>{getFirstLetters(value.label)}</span>
        </span>
         ))}
        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>
      {/* Dropdown Start */}
      <div
        ref={dropdown}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen ? 'block' : 'hidden'
          }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z"
                  fill=""
                />
                <path
                  d="M17.7719 21.4156H4.2281C1.89373 21.4156 0 19.5124 0 17.2031V16.4406C0 13.1156 3.58435 10.9781 7.4606 10.9781H14.5395C18.4158 10.9781 22 13.1156 22 16.4406V17.2031C22 19.5124 20.1063 21.4156 17.7719 21.4156ZM7.4606 12.525C4.19285 12.525 1.5531 14.3921 1.5531 16.4406V17.2031C1.5531 18.6468 2.7873 19.8593 4.2281 19.8593H17.7719C19.2127 19.8593 20.4469 18.6468 20.4469 17.2031V16.4406C20.4469 14.3921 17.8071 12.525 14.5395 12.525H7.4606Z"
                  fill=""
                />
              </svg>
              My Profile
            </Link>
          </li>
          <li>
            <Link
              to="#"
              onClick={handleChangePassword}
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <img src={ChangePasswordLogo} alt="Password" className="w-6.5" />
              Change Password
            </Link>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3.5 px-6 py-4.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <svg
            className="fill-current"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.9961 21.168C12.303 21.168 13.3477 20.1353 13.3477 18.8696V14.9213C13.3477 13.6556 12.303 12.6229 10.9961 12.6229H8.17188V9.37705H10.9961C12.303 9.37705 13.3477 8.34434 13.3477 7.07865V3.13032C13.3477 1.86462 12.303 0.831909 10.9961 0.831909H8.17188V0.831909C6.86505 0.831909 5.82031 1.86462 5.82031 3.13032V18.8696C5.82031 20.1353 6.86505 21.168 8.17188 21.168H10.9961Z"
              fill=""
            />
            <path
              d="M17.0442 14.4879C17.5315 14.4879 17.9173 14.9025 17.9173 15.3899V18.8697C17.9173 20.5401 16.5857 21.8718 14.9153 21.8718H2.91732C1.24688 21.8718 -0.0848389 20.5401 -0.0848389 18.8697V3.13032C-0.0848389 1.45988 1.24688 0.128174 2.91732 0.128174H14.9153C16.5857 0.128174 17.9173 1.45988 17.9173 3.13032V6.61008C17.9173 7.09743 17.5315 7.51208 17.0442 7.51208C16.5568 7.51208 16.1711 7.09743 16.1711 6.61008V3.13032C16.1711 2.64557 15.6701 2.1455 15.1854 2.1455H2.91732C2.43257 2.1455 1.9325 2.64557 1.9325 3.13032V18.8697C1.9325 19.3544 2.43257 19.8545 2.91732 19.8545H15.1854C15.6701 19.8545 16.1711 19.3544 16.1711 18.8697V15.3899C16.1711 14.9025 16.5568 14.4879 17.0442 14.4879Z"
              fill=""
            />
          </svg>
          Log Out
        </button>
      </div>
      {/* Dropdown End */}
    </div>
  );
};

export default DropdownUser;
