import { fetchRevenue } from '../lib/data';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';

async function RevenueSection() {
  const revenue = await fetchRevenue();
  
  return (
    <RevenueChart revenue={revenue}/>
  )
}

export default RevenueSection