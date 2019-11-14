import React from 'react'

import { useSelector } from 'react-redux'

import DisplayFlashToasts from './bits/DisplayFlashToasts/'

import LoginLayout from './layouts/Login'
import AdminLayout from './layouts/Admin'


const App = () => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn)
  
  return (
    <div>
      {
        isUserLoggedIn ?
          <AdminLayout />
          :
          <LoginLayout />
      }
      <DisplayFlashToasts />
    </div> 
  )
}

export default App