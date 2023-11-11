import React from 'react'
import Table from '@/app/ui/customers/table'
import { fetchFilteredCustomers } from '@/app/lib/data';

async function Customers() {
  const totalPages = await fetchFilteredCustomers('');

  return (
    <Table customers={totalPages}/>
  )
}

export default Customers