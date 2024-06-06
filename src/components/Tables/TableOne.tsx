import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import DateLogo from '../../images/calander/Glyph_ undefined.svg';
import { API_URL } from '../../utils/helpers/API';

type dataProps = {
  assigned_user_id: string;
  ticket_no: string;
  ticketid: string;
  createdtime: string;
  commentcontent: string;
};

interface Props {
  username: string;
  password: string;
}

const TableOne: React.FC<Props> = ({ username, password }) => {
  const [result, setResult] = useState<dataProps[]>([]);
  const encodedCredentials = btoa(`${username}:${password}`);
  const navigate = useNavigate(); // Initialize useNavigate
  

  const fetchData = async () => {
    const formdata = new FormData();
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      formdata.append("username", user.username);
      formdata.append("password", user.password);
    }
    formdata.append("_operation", "FetchMainDashboard");
    formdata.append("mode", "FetchLastComments");

    const requestOptions = {
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Basic ${encodedCredentials}`,
      },
      body: formdata,
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      const jsondata = await response.json();
      setResult(jsondata.result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMM yyyy HH:mm');
  };

  const handleCommentClick = (ticketid: string) => {
    navigate(`/tickets/17x${ticketid}`); // stick 17 che
  };

  return (
    <div className="rounded-2xl border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="text-xl font-semibold text-[#44546F]">Latest Comments</h4>
      <div className="flex flex-col">
        <div className="grid grid-cols w-full rounded-lg p-4 max-h-96 overflow-auto">
          {result.map((value, index) => (
            <div
              key={index}
              className='right-side p-3 mb-4 bg-[#F4F6F9] rounded shadow cursor-pointer'
              onClick={() => handleCommentClick(value.ticketid)}
            >
              <div className='flex justify-between'>
                <h1 className='flex text-[#44546F] font-bold'>{value.assigned_user_id}</h1>
                <div className='flex gap-2 items-center'>
                  <img src={DateLogo} alt="Date Logo" />
                  <p>{formatDate(value.createdtime)}</p>
                </div>
              </div>
              <p className='inline-block'>Ticket No: {value.ticket_no}</p>
              <p>Comment: {value.commentcontent}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableOne;
