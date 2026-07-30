import Navbar from '@/components/shared/Navbar'
import { getMe } from '@/services/getMe'
import React from 'react'

const AdminDashboard = async() => {
   const profile = await getMe()
  return (
    <>
    <Navbar user={profile}/>
    <div>AdminDashboard</div>
    </>
  )
}

export default AdminDashboard