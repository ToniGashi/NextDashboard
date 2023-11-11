import React from 'react';
import SearchIcon from '@/public/search.svg';
import Image from 'next/image';

function SearchBar() {
  return (
    <div className='w-[500px] h-[45px] rounded-full border border-solid border-[#c3d4e966]'>
        <Image
            src={SearchIcon}
            alt={`Searchbar icon`}
            width={24}
            height={24}
        />
    </div>
  )
}

export default SearchBar