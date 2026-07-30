import Navbar from '@/components/shared/Navbar'
import { getMe } from '@/services/getMe'
import React from 'react'

const TenantDashboard = async() => {
   const profile = await getMe()
  return (
    <>
    <Navbar user={profile}/>
    <div>TenantDashboard</div>
    </>
  )
}

export default TenantDashboard