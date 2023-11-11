import React from 'react'
import { HeartIcon } from '@heroicons/react/24/outline';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

async function FavoriteSection({carId, userId, fill} : {carId: string, userId: string, fill: string}) {
  return (
    <form>
        <button formAction={async () => {
            "use server";
        
            await sql`INSERT INTO favorites (user_id, car_id) 
            VALUES(${userId}, ${carId})
            ON CONFLICT (user_id, car_id)
            DO UPDATE SET is_favorite = NOT favorites.is_favorite`

            revalidatePath('/dashboard/cars')
        }}>
            <HeartIcon fill={fill} className='hover:cursor-pointer hover:text-red-200 h-[24px] w-[24px]'/>
        </button>
    </form>
  )
}

export default FavoriteSection