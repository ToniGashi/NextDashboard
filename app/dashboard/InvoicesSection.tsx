import { fetchLatestInvoices } from '../lib/data';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';

async function InvoicesSection() {
  const latestInvoices = await fetchLatestInvoices();
  
  return (
    <LatestInvoices latestInvoices={latestInvoices}/>
  )
}

export default InvoicesSection