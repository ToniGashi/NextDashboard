import React, { Suspense } from 'react'
import AdsSection from '@/app/ui/cars/adsSection';
import Search from '@/app/ui/search';
import { CarsSkeleton } from '@/app/ui/skeletons';
import CarsSection from '@/app/ui/cars/carsSection';

function Cars({
  searchParams,
}: {
  searchParams: {
    query?: string;
  };
}) {
  return (
    <div className='flex flex-col gap-8 items-center'>
        <div className='flex gap-6 justify-around'>
            <AdsSection />
        </div>

        <div>
          <Search placeholder='Search Cars' />
        </div>

        <Suspense fallback={<CarsSkeleton/>}>
            <CarsSection query={searchParams.query || ''}/>
        </Suspense>
    </div>
  )
}

export default Cars;