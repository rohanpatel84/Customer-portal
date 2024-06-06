import { API_URL } from '../../utils/helpers/API';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import { useEffect, useState } from "react";

type User = {
  salutationtype: string;
  firstname: string;
  label: string;
  company_details: {
    label: string;
  };
};

const initialUser: User = {
  salutationtype: "Mr.",
  firstname: "Rohan",
  label: "Rohan patel",
  company_details: {
    label: "Excellence Consultancy Services",
  },
};

type HeaderProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const Header: React.FC<HeaderProps> = (props) => {
  const [user, setUser] = useState<User | null>(initialUser);

  const fetchData = async () => {
    const formdata = new FormData();
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      formdata.append("username", parsedUser.username);
      formdata.append("password", parsedUser.password);
    }
    formdata.append("_operation", "FetchProfile");

    const requestOptions = {
      method: "POST",
      headers: {
        "Authorization": "Basic dml2ZWtAeGV4Y2VsbGVuY2UuY29tOmFwZGVmbWNz"
      },
      body: formdata,
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      const jsondata = await response.json();
      const customerDetails = jsondata.result.customer_details;
      const companyDetails = jsondata.result.company_details;

      setUser({
        ...customerDetails,
        company_details: {
          accountname: companyDetails.accountname,
          label: companyDetails.label,
        },
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-300'}`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && 'delay-400 !w-full'}`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-500'}`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-[0]'}`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-200'}`}
                ></span>
              </span>
            </span>
          </button>
        </div>

        <div className="hidden sm:block">
          {user && (
            <div className="relative">
              <h2 className='text-[#44546F] text-xl font-bold'>Welcome {user.label}</h2>
              <p>{user.company_details?.label}</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 2xsm:gap-4">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DropdownNotification />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
