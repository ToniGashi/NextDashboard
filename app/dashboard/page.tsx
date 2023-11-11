import React, { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { CardSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '../ui/skeletons';
import CardSection from './CardSection';
import RevenueSection from './RevenueSection';
import InvoicesSection from './InvoicesSection';


export default function Dashboard() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <Suspense fallback={<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>}>
        <CardSection />
      </Suspense>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <div className='w-full md:col-span-4'>
          <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Recent Revenue
          </h2>
          <Suspense fallback={RevenueChartSkeleton()}>
            <RevenueSection />
          </Suspense>
        </div>
        <div className='w-full md:col-span-4'>
          <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Latest Invoices
          </h2>
          <Suspense fallback={LatestInvoicesSkeleton()}>
            <InvoicesSection />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
