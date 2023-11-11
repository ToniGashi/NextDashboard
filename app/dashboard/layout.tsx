import React from 'react'
import TopNav from '@/app/ui/dashboard/topnav';

function Layout({children} : {children: React.ReactNode}) {
  return (
    <div className="flex h-screen flex-col">
      <TopNav />
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>
  )
}

export default Layout