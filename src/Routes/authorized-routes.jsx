import React from 'react'
import {useAuth} from '../../src/Context/authContext'
import {Navigate, useLocation, Outlet} from 'react-router-dom'

function AuthorizedRoutes() {
    const {auth} = useAuth()
    const location = useLocation()
  return (
    auth.isAuthorized ? 
    (<Outlet/>) : (<Navigate to='/login-page' state={{from : location}} replace/>)
  )
}

export default AuthorizedRoutes