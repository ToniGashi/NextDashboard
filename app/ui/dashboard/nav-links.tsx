"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
  { name: 'Cars', href: '/dashboard/cars', icon: TruckIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  
  return (
    <div className='flex shrink items-end gap-3'>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx({'bg-sky-100 text-blue-600': pathname===link.href}," justify-end gap-2 rounded-3xl bg-gray-50 p-1 md:p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600")}
          >
            <LinkIcon className="w-6 md:w-6" />
          </Link>
        );
      })}
    </div>
  );
}
