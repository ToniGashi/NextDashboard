import React from 'react'
import Ads1 from '@/public/ads1.svg'
import Ads2 from '@/public/ads2.svg'
import Image from 'next/image';

function StaticTopSection() {
  return (
    <div className='flex w-full gap-5 flex-wrap'>
      <Image
          src={Ads1}
          width={640}
          height={360}
          className="hidden md:block w-[48%]"
          alt="Ads1"
      />
      <Image
          src={Ads2}
          width={640}
          height={360}
          className="hidden md:block w-[48%]"
          alt="Ads2"
      />
    </div>
  )
}

export default StaticTopSection;