import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import AuthService from '../../../services/auth-service'

export const ProtectedRoute=(props)=>{

    const{component:Component, ...rest}=props

    return(
        <Route {...rest} render={(props)=>{if(AuthService.isTokenValid())
                                                return (<Component {...props} {...rest}/>)
                                             return(
                                                <Redirect to={{pathname:'/login'}}/>
                                            )
                                            }}/>
    )

}