import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const RootLayout = () => {
  return (
    <div className='p-6'>
      <Header />
      <Outlet />
    </div>
  )
}

export default RootLayout
