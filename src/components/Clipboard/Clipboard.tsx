import { useEffect, useState } from 'react'
import copyIcon from "../../images/Subscription/copy-svgrepo-com 1.svg";
import PinIcon from "../../images/Subscription/Glyph_ undefined.svg";

import { API_URL } from '../../utils/helpers/API';


type subscriptionProps = {
    cf_855: string,
}

interface Props {
    username: string;
    password: string;
}




const Clipboard: React.FC<Props> = ({ username, password }) => {
    const encodedCredentials = btoa(`${username}:${password}`);
    const [subscriptionData, setSubscriptionData] = useState<subscriptionProps[]>([]);


    const fetchData = async () => {
      const formdata = new FormData();
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        formdata.append("username", user.username);
        formdata.append("password", user.password);
      }
      formdata.append("_operation", "FetchProfile");
  
      // formdata.append('mode', 'FetchMainDashboard');
  
      const requestOptions = {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
          Authorization: `Basic ${encodedCredentials}`,
        },
        body: formdata,
      };
  
      try {
        const response = await fetch(API_URL, requestOptions);
        const jsondata = await response.json();
        console.log(jsondata);
        setSubscriptionData([jsondata.result.company_details]);
        //   setCount([{ count: jsondata.result.count }]);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
    const [text] = useState(
        "https://cms.targetcrm.cloud/gn IN"
    );

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(text);
            alert("Copied to clipboard!");
        } catch (err) {
            console.error(
                "Unable to copy to clipboard.",
                err
            );
            alert("Copy to clipboard failed.");
        }
    };

    return (
        <div className="w-full max-w-sm">
            <div className="mb-2 flex justify-between items-center">
                <label form="website-url" className="text-sm font-bold text-gray-900 dark:text-white">CRM Application link</label>
            </div>
            <div className="flex items-center">
                <span className="flex-shrink-0 z-10 inline-flex items-center p-2.5 h-13 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-600 dark:text-white dark:border-gray-600">

                    <img
                        src={PinIcon}
                        alt="Copy to Clipboard"

                        style={{ cursor: "pointer" }}
                        className="w-7 h-8"
                    />
                </span>
                {subscriptionData.map((value, index) => {
            return (
                <div  key={index} className="relative w-full">
                    <input
                        id="website-url"
                        type="text"
                        aria-describedby="helper-text-explanation"
                        className=" h-13 bg-gray-50 border border-e-0 border-gray-300 text-gray-500 dark:text-gray-400 text-sm border-s-0 focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={value.cf_855}
                    />
                </div>
                   )
                })}
                <button
                    onClick={handleCopyClick}
                    data-tooltip-target="tooltip-website-url"
                    data-copy-to-clipboard-target="website-url"
                    className="flex-shrink-0 z-10 inline-flex items-center p-2.5 h-13 text-sm font-medium text-center text-white bg-[#299D37] rounded-e-lg hover:bg-[#299D37]  dark:bg-[#299D37] dark:hover:bg-[#299D37] border border-[#299D37] dark:border-[#299D37] hover:border-[#299D37] dark:hover:border-[#299D37]"
                    type="button">
                    <span
                        id="default-icon">
                    

                        <img
                            src={copyIcon}
                            alt="Copy to Clipboard"
                            style={{ cursor: "pointer" }}
                            className="w-7"
                        />
                    </span>
                    <span
                        id="success-icon"
                        className="hidden items-center">
                        <svg className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 12">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    </span>
                </button>
           
            </div>
            
        </div>

    );
};

export default Clipboard;