import React from 'react'
import {useSelector} from 'react-redux'
import Login from '../user/login'

const ProtectedRoute = ({children}) => {
    const {isAuthenticated,user,loading} = useSelector((state) => state.auth)
    console.log(user,isAuthenticated)
    return((!loading&&isAuthenticated) ? children: <Login/>)

}
export default ProtectedRoute