import { useEffect, useState } from 'react';
import logo from '../../images/meeting/Glyph_ undefined.svg'

import { Props } from 'react-apexcharts';
import { API_URL } from '../../utils/helpers/API';
// import { useNavigate } from 'react-router-dom';

type ChatCardProps = {
  due_date: string;
  date_start: string;
  subject: string;
  smownerid: string;
  description: string;
  parent_id: string
  contactid: string
  status: string
  modifiedtime: string
  createdtime: string
  location: string
};

const ChatCard: React.FC<Props> = ({ username, password }) => {
  const [meetings, setMeetings] = useState<ChatCardProps[]>([]);
  const encodedCredentials = btoa(`${username}:${password}`);
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

  const fetchData = async () => {
    const formdata = new FormData();
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      formdata.append('username', user.username);
      formdata.append('password', user.password);
    }
    formdata.append('_operation', 'FetchMainDashboard');
    formdata.append('mode', 'FetchUpcomingActivities');
    formdata.append('Module', 'Calendar');
    formdata.append('ModuleLabel', 'Activities');
    formdata.append('Modulemode', 'all');


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
      // console.log(jsondata)

      if(!jsondata.success) {
        console.log("check")
        jsondata.error
        if(jsondata.error.message == "No Data") {
          jsondata.result = []
        }
      }
      setMeetings(jsondata.result);
      // console.log(jsondata.result)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getFirstLetters = (name: string): string => {
    const words = name.split(" ");
    let result = "";
    for (let i = 0; i < 2 && i < words.length; i++) {
      result += words[i].charAt(0).toUpperCase();
    }
    return result;
  };

  return (
    <div className="col-span-12 rounded-2xl border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4 h-fit">
      <h4 className="px-7.5 text-xl font-semibold text-black dark:text-white">Upcoming Meetings</h4>
      <div>
        {meetings.length > 0 ? (
          meetings.map((value, index) => (
            <div key={index} className="flex flex-col mt-4">
              <div className="flex gap-3">
                <div className="mt-3 ml-7 inline-block">
                  <p className="w-10 h-10 bg-[#D0662E]  font-bold rounded-full flex items-center justify-center bg-gray-200 text-white">{getFirstLetters(value.smownerid)}</p>
                </div>
                <div className="right-side p-2">
                <h1 className="flex text-[#44546F] font-bold">{value.smownerid}</h1>
                  <h1 className="flex">{value.subject}</h1>
                  <p>{value.description}</p>
                  <p>{value.location}</p>

                  <p className="inline-block text-sm">{value.date_start}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="mb-3 ml-8 mt-3 inline-block">
                  <img className="w-8" src={logo} alt="Meeting Logo"></img>
                </div>
                <div className="right-side p-4">
                  <a className="text-[#2673C7]" href="#">
                    https://cms.targetcrm.cloud/Meeting
                    {value.location}
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='flex ml-8 mt-5'>No upcoming meetings</p>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
