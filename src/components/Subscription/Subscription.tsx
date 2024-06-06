import { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import userLogo from '../../images/user/Company small logo.png';
import { format } from 'date-fns';
import PieChartComponent from '../PieChartComponent/PieChartComponent';
import { API_URL } from '../../utils/helpers/API';
import Clipboard from '../Clipboard/Clipboard';



type subscriptionProps = {
  cf_880: string,
  employees: string,
  cf_855: string,
  cf_853: string,
  cf_861: string,
}
interface Props {
  username: string;
  password: string;
}


const Subscription: React.FC<Props> = ({ username, password }) => {
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

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd-MMM-yyyy');
  }


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Subscription" />

      <div className='gap-5'>
        <div className='flex gap-10'>
          <div className='main-container rounded-2xl border border-stroke bg-white p-4 shadow-default w-[20%]'>
            <div className='text-container flex items-center gap-5'>
              <div className='left-logo'>
                <img src={userLogo} className='w-15'></img>
              </div>
              {subscriptionData.map((value, index) => {
                return (
                  <div key={index} className='active-user'>
                    <h1 className='text-[#44546F] font-bold text-xl'>{value.employees}</h1>
                    <h3 className='text-[#299D37] font-normal text-xl'>Active User</h3>
                  </div>
                )
              })}
            </div>
          </div>

          <div className='flex'>
            <div className="flex gap-3 w-fit border border-stroke bg-black shadow-default rounded-2xl px-25">
              <div className='flex gap-5 items-center'>
                <div className="snap-always snap-center ... w-40 h-12 font-bold text-white border-stroke bg-white shadow-default rounded-xl  bg-gradient-to-r from-[#6DDCFF] to-[#7F60F9]">
                  <p className='text-center py-3'>Start up</p>
                </div>
                <div className="snap-always snap-center ... w-40 h-12 font-bold border-stroke bg-white shadow-default rounded-xl text-white  bg-gradient-to-r from-[#6DDCFF] to-[#7F60F9]">
                  <p className='text-center py-3'>Enterprise</p>
                </div>
                <div className="snap-always snap-center ... w-40 h-12 font-bold border-stroke bg-white shadow-default rounded-xl text-white  bg-gradient-to-r from-[#6DDCFF] to-[#7F60F9] ">
                  <p className='text-center py-3'>Start up</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="rounded-2xl border border-stroke bg-white mt-10 px-5 pt-6 pb-2.5 shadow-default
         dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div>
            <h3 className='text-[#D0662E] font-normal text-xl block'>Payment Cycle</h3>
          </div>
          {subscriptionData.map((value, index) => {
            return (
              <div>
                <div key={index} className='mt-5 flex'>
                  <div className='main-container rounded-2xl border border-stroke bg-white shadow-default w-40' >
                    <h1 className='p-2 font-bold text-center justify-center'>{value.cf_880}</h1>
                  </div>
                  <div className='ml-90 flex '>
                    <div className='ml-49'>
                      {/* 861 for API */}
                      <p> <span className='font-bold'>Subscription Start Date :</span> {formatDate(value.cf_861)}</p>
                      <div className='flex'>
                        {/* 853 for API */}
                        <p> <span className='font-bold'>Subscription Due Date :</span> {formatDate(value.cf_853)}</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )
          })}
          <div className='flex'>
            <PieChartComponent username={''} password={''} />
            <div className='flex mt-60 ml-70'>
              <Clipboard username={''} password={''} />
            </div>
          </div>

        </div>
      </div>
    </DefaultLayout>
  )
}

export default Subscription;
