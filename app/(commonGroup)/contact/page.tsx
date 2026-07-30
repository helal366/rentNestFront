import Navbar from '@/components/shared/Navbar'
import { getMe } from '@/services/getMe'
import React from 'react'

const Contact = async() => {
  const profile = await getMe()
  return (
    <>
    <Navbar user={profile}/>
    <div>Contact Page</div>
    </>
  )
}

export default Contact