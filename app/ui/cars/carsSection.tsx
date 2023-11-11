import { fetchCars, fetchFavoriteCars } from '@/app/lib/data';
import React from 'react'
import Image from 'next/image';
import { cookies } from 'next/headers';
import FavoriteSection from './favoriteSection';

async function CarsSection({query}: {query: string}) {
  const cars = await fetchCars();
  const userId = cookies().get('userId')?.value || "";
  const carFavoriteObject = await fetchFavoriteCars(userId);

  return (
    <div className='flex flex-wrap gap-5 justify-center md:justify-start'>
        {cars.filter((car) => car.model.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()) || car.year.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()) || car.gearbox.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()) || car.fuel_type.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())).map(car => (
            <div key={car.id} className='w-[18.5%] min-w-[200px] rounded-xl bg-white flex flex-col p-6 gap-6 justify-between shadow-md shadow-slate-200'>
                <div className='flex justify-between'>
                    <div className='flex flex-col'>
                        <h4 className=' font-bold text-lg'>{car.model}</h4>
                        <p>Sport</p>
                    </div>
                    <FavoriteSection carId={car.id} userId={userId} fill={carFavoriteObject[car.id] ? 'red' : 'white'}/>
                </div>
                <div className='content-center align-middle items-center self-center justify-center '>
                    <Image src={car.main_image} width={230} height={75} alt={`${car.model} image`}/>
                </div>
                <div>
                    More info incomming...
                </div>
            </div>
        ))}
    </div>
  )
}

export default CarsSection;