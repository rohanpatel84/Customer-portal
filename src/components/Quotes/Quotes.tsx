
import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import ticketlogo from '../../images/task/Glyph_ undefined.png';
import logo from '../../images/cards/Group 50 (1).png';
import { format } from 'date-fns';
import { API_URL } from '../../utils/helpers/API';


type QuotesProps = {
  subject: string,
  account_id: { label: string},
  assigned_user_id: { value:string; label: string},
  bill_street: string,
  ship_street: string,
  invoice_no: string
  invoicedate: string
  invoicestatus: string
  hdnGrandTotal: string
  quotestage: string
  quote_no: string
  validtill: string

}


type CountProps = {
  count: string;
};

type StatusCountProps = {
  Paid: string
  Sent: string
}


interface Props {
  username: string;
  password: string;
}

const Quotes: React.FC<Props> = ({ username, password }) => {
  const encodedCredentials = btoa(`${username}:${password}`);

  const [Quotes, setQuotes] = useState<QuotesProps[]>([]);
  const [count, setCount] = useState<CountProps[]>([]);
  const [statusCount, setStatusCount] = useState<StatusCountProps[]>([]);

  const fetchData = async () => {
    const formdata = new FormData();
    const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
          const user = JSON.parse(storedUser);
          formdata.append("username", user.username);
          formdata.append("password", user.password);
      }
    formdata.append('_operation', 'FetchRecords');
    formdata.append('module', 'Quotes');
    formdata.append('moduleLabel', 'Quotes');
    formdata.append('mode', 'mine');

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
      setQuotes(jsondata.result.data);
      setStatusCount([jsondata.result.StatusCount]);
      setCount([{ count: jsondata.result.count }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const formatDate = (dateString: string) => {
  //   return format(new Date(dateString), 'dd MMM yyyy HH:mm');
  // };


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Quotes" />

      <div>
        <div className='flex gap-5'>
          <button className='left-ticket w-[20%] flex gap-3 rounded-lg shadow-lg p-2 bg-gradient-to-r from-[#FFC56F] to-[#FF8545] items-center drop-shadow-md'>
            <div className='left-logo inline-block'>
              <img className='w-10 inline-block' src={logo}></img>
            </div>
            <button className='right-logo gap-2 flex p-1 items-center'>
              {count.map((value, index) => {
                return (
                  <h2 key={index} className='font-bold text-2xl'>{value.count}</h2>
                )
              })}
              <h3 className='font-semibold text-lg'>Total Invoice</h3>
            </button>
          </button>

          <div className='right-ticket w-[60%]  items-center'>
            <div className='tickets flex py-2 gap-3'>

              <div className='all-ticket flex gap-3 items-center  py-2 px-8 border-2 border-[#E8EDF1] rounded-lg'>
                <div className='left-logo inline-block'>
                  <img className='w-8' src={ticketlogo}></img>
                </div>
                <div className='right-logo relative'>
                  {/* {statusCount.map((value, index) => {
                return ( */}
                  <div className="font-bold px-2 bg-[#36BB2B] rounded-full text-center text-white text-md absolute -top-5 -end-10">
                    {/* {value.Paid} */}
                    <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full" ></div>
                  </div>
                {/* //   )
                // })} */}
                  <button className='font-medium text-xl'>Paid</button>
                </div>
              </div>

              <div className='all-ticket flex gap-3 items-center  py-2 px-8 border-2 border-[#E8EDF1] rounded-lg'>
                <div className='left-logo inline-block'>
                  <img className='w-8' src={ticketlogo}></img>
                </div>
                <div className='right-logo relative'>
                  {/* {statusCount.map((value, index) => {
                return (  */}
                  <div className="font-bold px-2 bg-[#36BB2B] rounded-full text-center text-white text-md absolute -top-5 -end-10">
                    {/* {value.Sent} */}
                    <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full" ></div>
                  </div>
                   {/* )
                })} */}
                  <button className='font-medium text-xl'>Sent</button>
                </div>
              </div>

            </div>
          </div>

        </div>
        {/* open ticket page */}

        <div className='mt-10 flex justify-between items-center'>
          <div className='left-ticket-box'>
            <h1 className='text-[#44546F] font-bold'>Quotes Details</h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {Quotes.map((value, index) => {
            const formattedValue = Number(value.hdnGrandTotal).toFixed(2);
            const trimmedValue = formattedValue.replace(/\.?0*$/, '');
            return (
              <div key={index}>
                
                <div className='gap-3 rounded-lg mt-5 border-2 border-[#E8EDF1] p-2'>
                  <div className='ticket-status flex justify-between m-2'>
                    <p className='text-[#44546F] font-bold'>#{value.quote_no}</p>
                    <h2 className=' text-[#248A3D] font-semibold '>{value.quotestage}</h2>
                  </div>
                  <div className='ticket-content'>
                    <div className='p-2'>
                      <h1 className='inline-block'>{value.subject}</h1> <br />
                      <h2 className='inline-block'>{value.account_id.label}</h2>
                      <hr className='mt-4' />
                      <div className='flex items-center gap-2 justify-between'>
                        <p className='mt-1'><span className='text-[#D0662E]'>Valid Till: </span>{(value.validtill)}</p>
                        <p className='mt-1'>Rs. {trimmedValue}/-</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </DefaultLayout>
  )
};

export default Quotes;