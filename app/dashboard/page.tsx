import React from 'react';
import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { CardSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '../ui/skeletons';
const CardSection = React.lazy(() => import('./CardSection'));
const RevenueSection = React.lazy(() => import('./RevenueSection'))
const InvoicesSection = React.lazy(() => import('./InvoicesSection'))

export default async function Dashboard() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <Suspense fallback={
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>}>
        <CardSection />
      </Suspense>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
      <Suspense fallback={RevenueChartSkeleton()}>
        <RevenueSection />
      </Suspense>
      <Suspense fallback={LatestInvoicesSkeleton()}>
        <InvoicesSection/>
      </Suspense>
      </div>
    </main>
  );
}