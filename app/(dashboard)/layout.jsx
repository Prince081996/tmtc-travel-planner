import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../conf/auth';
import { redirect } from 'next/navigation';
import NavBar from '../components/NavBar';



const layout = async({children}) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      redirect("/");
    }
  
  return (
    <div>
      <NavBar />
      <main>{children}</main>
    </div>
  )
}

export default layout