import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { useEffect, useState } from 'react'
import { differenceInDays, parseISO } from 'date-fns'
import { API_URL } from '../../utils/helpers/API';


type subscriptionProps = {
  cf_853: string,
  cf_861: string,
}
interface Props {
  username: string;
  password: string;
}

const COLORS = ['#D98D56', '#808080', '#FFBB28', '#FF8042'];

const PieChartComponent: React.FC<Props> = ( username, password ) => {
  const encodedCredentials = btoa(`${username}:${password}`);
  const [subscriptionData, setSubscriptionData] = useState<subscriptionProps[]>([]);
  const [subscriptionStartDate, setSubscriptionStartDate] = useState<Date | null>(null);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState<Date | null>(null);
  const [usedDays, setUsedDays] = useState<number>(0);
  const [remainingDays, setRemainingDays] = useState<number>(0);



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
      const { cf_853, cf_861 } = jsondata.result.company_details;
      setSubscriptionData([jsondata.result.company_details]);
      //format(new Date(cf_861), 'dd MMM yyyy HH:mm');
      setSubscriptionStartDate(new Date(cf_861));
      setSubscriptionEndDate(new Date(cf_853));
    
      const totalDaysSubscription = differenceInDays( new Date(cf_853),new Date(cf_861));

      console.log(totalDaysSubscription);
      const currentDate = new Date();
      const elapsedDays = differenceInDays(currentDate, parseISO(cf_861));

      setUsedDays(elapsedDays);
      //used days
      console.log(elapsedDays);
      
      setRemainingDays(totalDaysSubscription - elapsedDays);
      //remaining days
      console.log(remainingDays);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PieChart width={400} height={400}>
      <Pie
         data={[
          { name: 'Used Days', value: usedDays },
          { name: 'Remaining Days', value: remainingDays },
        ]}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {[
          { name: 'Used Days', value: usedDays },
          { name: 'Remaining Days', value: remainingDays },
        ].map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>

  );
};

export default PieChartComponent;