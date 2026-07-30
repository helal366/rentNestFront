import Navbar from '@/components/shared/Navbar'
import { getMe } from '@/services/getMe'
import React from 'react'

const PropertiesPage = async() => {
  const profile = await getMe()
  return (
   <>
     <Navbar user={profile}/>
    <div>PropertiesPage</div>
   </>
  )
}

export default PropertiesPage