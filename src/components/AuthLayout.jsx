import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {
    console.log("authentication : " +  authentication)
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.isLoggedIn)
    console.log(authStatus)
    useEffect(() => {
        //TODO: make it more easy to understand

        if(authentication && authStatus === false)
            navigate("/")
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}
