import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import Search from '../search';
import { cookies } from 'next/headers';

export default function TopNav() {
  return ( 
    <div className="flex items-center w-full px-3 py-4 md:px-2 bg-white justify-between">
      <Link
        className="mb-2 flex justify-start rounded-md bg-blue-600 mx-3 md:mx-10"
        href="/"
      >
          <AcmeLogo />
      </Link>
      <NavLinks />
      <div className="flex flex-row justify-between space-x-2 rounded-3xl items-center gap-2 p-1 bg-gray-50 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:h-[48px] md:w-fit md:p-3 md:px-3 md:flex-col md:space-x-0 md:mx-10 md:space-y-2">
        <form action={async () => {
          'use server';
          cookies().delete('userId');
          await signOut();
        }}>
          <button className='flex w-full items-center justify-center'>
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
