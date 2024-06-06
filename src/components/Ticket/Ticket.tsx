"use client";
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import logo from '../../images/cards/Group 50.svg';
import greenlogo from '../../images/task/Vector.svg';
import redlogo from '../../images/task/Glyph_ undefined.svg';
import yellowlogo from '../../images/task/yellowLogo.svg';
import orangelogo from '../../images/task/orangelogo.svg';
import datelogo from '../../images/calander/Glyph_ undefined.svg';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import plusLogo from '../../images/Button/Glyph_ undefined.svg';
import ReactPaginate from 'react-paginate';
import { API_URL } from '../../utils/helpers/API';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



type TicketProps = {
  assigned_user_id: string;
  ticket_no: string;
  id: string;
  createdtime: string;
  commentcontent: string;
  ticketstatus: string;
  description: string;
  product_id: string;
  ticketseverities: string;
  ticketcategories: string;
};

type countProps = {
  count: string;
};

type StatusCountProps = {
  Open: string;
  Closed: string;
  WaitForResponse: string;
  InProgress: string;
};

interface Props {
  username: string;
  password: string;
}

const Tickets: React.FC<Props> = ({ username, password }) => {
  const encodedCredentials = btoa(`${username}:${password}`);

  const [ticket, setTicket] = useState<TicketProps[]>([]);
  const [count, setCount] = useState<number>(0);
  const [countPage, setcountPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [statusCount, setStatusCount] = useState<StatusCountProps[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('ticket_no');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const isLoggedIn = () => {
    const storedUser = sessionStorage.getItem("user");
    return !!storedUser;
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, []);
// Handler for search input change
const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchValue(event.target.value);
};

// Handler for pressing Enter key in search input
const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === 'Enter') {
    fetchData(selectedStatus, currentPage);
  }
};

// Handler for search category change
const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setSearchCategory(event.target.value);
};


  const fetchData = async (status: string, page: number = 0) => {
    const formdata = new FormData();
    console.log("this is search", searchValue)
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      formdata.append("username", user.username);
      formdata.append("password", user.password);
    }
    formdata.append("_operation", "FetchRecords");
    formdata.append("module", "HelpDesk");
    formdata.append("moduleLabel", "HelpDesk");
    formdata.append("mode", "mine");
    formdata.append("page", page.toString());
    formdata.append("pageLimit", '10');

    if (status !== "All") {
      formdata.append("fields", JSON.stringify({
        ticketstatus: status
      }));
    }

    const searchFields: { [key: string]: string } = {};

    if (searchValue !== "") {
      searchFields[searchCategory] = searchValue;
    }

    Object.keys(searchFields).forEach((key) => {
      formdata.append("fields", JSON.stringify({
        [key]: searchFields[key]
      }));
    });

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
      setTicket(jsondata.result.data);
      if (status === "All") {
        setCount(jsondata.result.count);
        setcountPage(jsondata.result.count);
      } else {
        setcountPage(jsondata.result.count);
      }
      setStatusCount([jsondata.result.StatusCount]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData(selectedStatus, currentPage);
  }, [currentPage, selectedStatus]);

  const handleButtonClick = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(0);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMM yyyy HH:mm');
  };

  const statusColors: { [key: string]: string } = {
    Open: 'text-[#248A3D]',
    Closed: 'text-[#FF681A]',
    WaitForResponse: 'text-[#F2B20E]',
    InProgress: 'text-[#E10707]',
  };

  // Filter tickets based on the search value and category
  const filteredTickets = ticket.filter((t) => {
    if (searchCategory === 'ticket_no') {
      return t.ticket_no.toLowerCase().includes(searchValue.toLowerCase());
    }
    return false;
  });


  const getButtonClasses = (status: string) => {
    let baseClasses = 'flex gap-3 items-center py-2 px-8 border-2 rounded-lg';
    let hoverClasses = '';
    let activeClasses = '';

    switch (status) {
      case 'Open':
        hoverClasses = 'hover:text-[#248A3D] hover:border-[#CBFEB3] hover:bg-[#E6FEE8]';
        activeClasses = 'text-[#248A3D]  border-[#CBFEB3] bg-[#E6FEE8]';
        break;
      case 'Closed':
        hoverClasses = 'hover:text-[#FF681A] hover:border-[#FEC4A5] hover:bg-[#FFF5EC]';
        activeClasses = 'text-[#FF681A]  border-[#FEC4A5] bg-[#FFF5EC]';
        break;
      case 'In Progress':
        hoverClasses = 'hover:text-[#E10707] hover:border-[#FFA4A4] hover:bg-[#FFEBEB]';
        activeClasses = 'text-[#E10707]  border-[#FFA4A4] bg-[#FFEBEB]';
        break;
      case 'Wait For Response':
        hoverClasses = 'hover:text-[#F2B20E] hover:border-[#FEE9B5] hover:bg-[#FFF8E8]';
        activeClasses = 'text-[#F2B20E]  border-[#FEE9B5] bg-[#FFF8E8]';
        break;
      default:
        activeClasses = 'border-[#E8EDF1]';
    }
    return `${baseClasses} ${hoverClasses} ${activeClasses}`;
  };

  const commentsPerPage = 10;
  const pageCount = Math.ceil(countPage / commentsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const renderPagination = () => {
    return pageCount > 1 && (
      <ReactPaginate className="flex justify-end gap-5 mt-2"
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
        activeLinkClassName={currentPage === 0 ? 'rounded bg-[#D0662E] text-white p-1' : 'rounded bg-[#D0662E] text-white p-1'}
      />
    );
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Ticket" />
      <div>
        <div className='flex gap-5'>
          <button className='left-ticket w-[20%] flex gap-3 rounded-lg shadow-lg p-2 bg-gradient-to-r from-[#FFC56F] to-[#FF8545] items-center drop-shadow-md'>
            <div className='left-logo inline-block'>
              <img className='w-10 inline-block' src={logo}></img>
            </div>
            <button className='right-logo gap-2 flex p-1 items-center'>
              <h2 className='font-bold text-2xl'>{count}</h2>
              <h3 className='font-semibold text-lg'>Total Ticket</h3>
            </button>
          </button>

          <div className='right-ticket w-[60%] items-center'>
            <div className='tickets flex py-2 gap-3'>
              <button className={getButtonClasses('Open')} onClick={() => handleButtonClick('Open')}>
                <div className='left-logo inline-block'>
                  <img className='' src={greenlogo}></img>
                </div>
                <div className='right-logo relative'>
                  {statusCount.map((value, index) => {
                    return (
                      <div key={index} className="font-bold px-2 bg-[#248A3D] rounded-full text-center text-white text-md absolute -top-5 -end-10">
                        {value.Open}
                        <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full" ></div>
                      </div>
                    )
                  })}
                  <button className='font-medium text-xl'>Open</button>
                </div>
              </button>

              <button className={getButtonClasses('Closed')} onClick={() => handleButtonClick('Closed')}>
                <div className='left-logo inline-block'>
                  <img src={orangelogo}></img>
                </div>
                <div className='right-logo relative'>
                  {statusCount.map((value, index) => {
                    return (
                      <div key={index} className="font-bold px-2 bg-[#FF8545] rounded-full text-center text-white text-md absolute -top-5 -end-10">
                        {value.Closed}
                        <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full" ></div>
                      </div>
                    )
                  })}
                  <button className='font-medium text-xl'>Closed</button>
                </div>
              </button>

              <button className={getButtonClasses('In Progress')} onClick={() => handleButtonClick('In Progress')}>
                <div className='left-logo inline-block'>
                  <img className='' src={redlogo}></img>
                </div>
                <div className='right-logo relative'>
                  {statusCount.map((value, index) => {
                    return (
                      <div key={index} className="font-bold px-2 bg-[#E10707] rounded-full text-center text-white text-md absolute -top-5 -end-10">
                        {value.InProgress}
                        <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full" ></div>
                      </div>
                    )
                  })}
                  <button className='font-medium text-xl'>Progress</button>
                </div>
              </button>

              <button className={getButtonClasses('Wait For Response')} onClick={() => handleButtonClick('Wait For Response')}>
                <div className='left-logo inline-block'>
                  <img className='' src={yellowlogo}></img>
                </div>
                <div className='right-logo relative'>
                  {statusCount.map((value, index) => {
                    return (
                      <div key={index} className="font-bold px-2 bg-[#F4C754] rounded-full text-center text-white text-md absolute -top-5 -end-10">
                        {value.WaitForResponse}
                        <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full"></div>
                      </div>
                    )
                  })}
                  <button className='font-medium text-xl'>Waiting</button>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className='mt-10 flex justify-between items-center'>
          <div className='left-ticket-box'>
            <h2 className='text-[#44546F] font-bold'>{selectedStatus} Tickets</h2>
          </div>

          <div className='flex gap-2'>
          <select
              value={searchCategory}
              onChange={handleCategoryChange}
              className="border border-gray-300 rounded-md py-1 px-2 mr-2"
            >
              <option value="ticket_no">Ticket Number</option>
            </select>
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              placeholder={`Search by ${searchCategory.replace('_', ' ')}`}
              className="border border-gray-300 rounded-md py-1 px-2"
            />
          </div>

          <div>
            <NavLink
              to="/Messages"
              className={`border border-[#D0662E] text-md rounded-lg  group relative flex items-center gap-2.5 py-2 px-4 font-medium text-graydark ${pathname.includes('Messages') &&
                'bg-graydark dark:bg-meta-4'
                }`}>
              <div>
                <img src={plusLogo}></img>
              </div>
              Create Ticket
            </NavLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filteredTickets.map((value, index) => (
            <NavLink to={`/tickets/${value.id}`} key={index}>
              <div className='gap-3 rounded-lg mt-5 border-2 border-[#E8EDF1] p-2'>
                <div className='ticket-content'>
                  <div className='p-2'>
                    <div className='flex justify-between'>
                      <h1 className='inline-block text-[#44546F] font-bold'>{value.ticket_no}</h1>
                      <div className='flex items-center'>
                        <h2 className={`${statusColors[value.ticketstatus]} font-semibold`}>{value.ticketstatus}</h2>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div>
                        <p className='mt-1'>{value.description}</p>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <div className='date-logo max-w-4 mt-1'>
                        <img src={datelogo} alt="Date Logo" />
                      </div>
                      <div>
                        <p className='text-strokedark text-[11px]'>{formatDate(value.createdtime)} Createdtime</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      {renderPagination()}
    </DefaultLayout>
  );
}

export default Tickets;
