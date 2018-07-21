import {FETCH_USERS_NOTIFICATIONS_SUCCESS,FETCH_RENTAL_BOOKINGS_INIT,FETCH_RENTAL_BOOKINGS_FAILED,FETCH_RENTAL_BOOKINGS_SUCCESS,FETCH_USERS_BOOKINGS_SUCCESS, FETCH_USERS_BOOKINGS_FAILED,FETCH_USERS_BOOKINGS_INIT,FETCH_USERS_RENTALS_FAILED,FETCH_USERS_RENTALS_INIT,FETCH_USERS_RENTALS_SUCCESS, FETCH_RENTALS_INIT,FETCH_RENTALS_FAILED,LOGOUT,LOGIN_SUCCESS,LOGIN_FAILED,FETCH_RENTALS_SUCCESS,FETCH_RENTAL_BY_ID_SUCCESS,FETCH_RENTAL_BY_ID_PENDING} from "./types"
import axios from 'axios';
import AuthService from '../services/auth-service'
import AxiosService from '../services/axios-service'
import axiosService from "../services/axios-service";

const axiosInstance =axiosService.getInstance()


export const fetchUsersNotifications=()=>{

    return dispatch=>{
        axiosInstance.get(`/notifications`)
        .then(
            response=>{ console.log('>>>>>>>',response.data.notifications) ,dispatch(fetchUsersNotificationsSuccess(response.data.notifications))},
            error=>Promise.reject(error.response.data.errors)
        )
    }

}

export const fetchUsersNotificationsSuccess=(notifications)=>{

    return{
        type:FETCH_USERS_NOTIFICATIONS_SUCCESS,
        payload:notifications

    }

}


export const cancelBooking=(bookingId)=>{

    return axiosInstance.put(`/bookings/manage/cancel/${bookingId}`)
        .then(
            response=>response.data,
            error=>Promise.reject(error.response.data.errors)
        )

}

export const deleteRental=(rentalId)=>{

    return axiosInstance.delete(`/rentals/${rentalId}`)
        .then(
            response=>response.data,
            error=>Promise.reject(error.response.data.errors)
        )

}

export const fetchRentalBookings=(rentalId)=>{

    return dispatch=>{
        dispatch(fetchRentalBookingsInit())
        axiosInstance.get(`/rentals/manage/rentalbookings/${rentalId}`)
        .then(
            response=>dispatch(fetchRentalBookingsSuccess(response.data))
            ,
            error=>dispatch(fetchRentalBookingsFailed(error.response.data.errors))
        )
        
    }

}

export const fetchRentalBookingsInit=()=>{

    return {
        type:FETCH_RENTAL_BOOKINGS_INIT
    }

}

export const fetchRentalBookingsSuccess=(bookings)=>{

    return {
        type:FETCH_RENTAL_BOOKINGS_SUCCESS,
        payload:bookings
    }

}

export const fetchRentalBookingsFailed=(error)=>{

    return {
        type:FETCH_RENTAL_BOOKINGS_FAILED,
        payload:error
    }

}

export const addRental=(rental)=>{

    return axiosInstance.post('/rentals/add', rental)
        .then(
            response=>response.data,
            error=>Promise.reject(error.response.data.errors)
        )

}

export const fetchUsersRentals=()=>{

    return dispatch=>{
        dispatch(fetchUsersRentalsInit())
        axiosInstance.get('/rentals/manage')
            .then(response=>dispatch(fetchUsersRentalsSuccess(response.data)))
            .catch(errors=>dispatch(fetchUsersRentalsFailed(errors.response.data.errors)))
    }

}

export const fetchUsersRentalsSuccess=(usersRentals)=>{

    return{
        
        type:FETCH_USERS_RENTALS_SUCCESS,
        payload:usersRentals,

    }

}

export const fetchUsersRentalsInit=()=>{

    return{
        
        type:FETCH_USERS_RENTALS_INIT,

    }

}

export const fetchUsersRentalsFailed=(errors)=>{

    return{
        
        type:FETCH_USERS_RENTALS_FAILED,
        payload:errors

    }

}

export const fetchUsersBookings=()=>{

    return dispatch=>{
        dispatch(fetchUsersRentalsInit())
        axiosInstance.get('/bookings/manage')
            .then(response=>dispatch(fetchUsersBookingsSuccess(response.data)))
            .catch(errors=>dispatch(fetchUsersBookingsFailed(errors.response.data.errors)))
    }

}

export const fetchUsersBookingsSuccess=(usersBookings)=>{
    return{
        
        type:FETCH_USERS_BOOKINGS_SUCCESS,
        payload:usersBookings,

    }

}

export const fetchUsersBookingsInit=()=>{

    return{
        
        type:FETCH_USERS_BOOKINGS_INIT,

    }

}

export const fetchUsersBookingsFailed=(errors)=>{

    return{
        
        type:FETCH_USERS_BOOKINGS_FAILED,
        payload:errors

    }

}



export const fetchRentals=(city)=>{

    const url = city ? `/rentals?city=${city}` : '/rentals'
    
    return dispatch=>{
        dispatch(fetchRentalsInit())
        axiosInstance.get(url)
            .then(response=>dispatch(fetchRentalsSuccess(response.data)))
            .catch(errors=>dispatch(fetchRentalsFailed(errors.response.data.errors)))
    }

}

export const fetchRentalsSuccess=(rentals)=>{

    return{
        
        type:FETCH_RENTALS_SUCCESS,
        payload:rentals,

    }

}

export const fetchRentalsInit=(rentals)=>{

    return{
        
        type:FETCH_RENTALS_INIT,

    }

}

export const fetchRentalsFailed=(errors)=>{

    return{
        
        type:FETCH_RENTALS_FAILED,
        payload:errors

    }

}



export const fetchRentalById=(rentalId)=>{
    
    
    return function(dispatch){
        
        dispatch(fetchRentalByIdPending())
        
        axios.get(`http://localhost:3000/api/v1/rentals/${rentalId}`)
            .then(response=>dispatch(fetchRentalByIdSuccess(response.data)))

    }

}


export const fetchRentalByIdSuccess=(rental)=>{
    const bool=false
    return{
        type:FETCH_RENTAL_BY_ID_SUCCESS,
        payload:rental,
        isPending:bool,
    }
}

export const fetchRentalByIdPending=()=>{
    const bool=true
    return{
        type:FETCH_RENTAL_BY_ID_PENDING,
        payload:bool,
    }

}



export const register=(userData)=>{

    return axios.post('/api/v1/users/register', userData)
    
        .then((response)=>response.data,
    
        (error)=>Promise.reject(error.response.data.errors)
    )
    //.catch(error=>console.log(error))
}

export const checkAuthState=()=>{

    return dispatch=>{
        if(AuthService.isTokenValid())
            dispatch(loginSuccess())
        else 
            dispatch(logout())
    }


}


export const login=(userData)=>{

    return dispatch=>{ axios.post('/api/v1/users/auth', userData)
    
        .then(
            response=>response.data 
        )
        .then(token/*token is response.data*/=>{
            AuthService.sendToken(token)
            dispatch(loginSuccess())
        })
        .catch(errors=>dispatch(loginFailed(errors.response.data.errors)))
    }
}

export const loginSuccess=()=>{
    const username=AuthService.getUsername()
    return {
        type:LOGIN_SUCCESS,
        payload:username
    }
}

export const loginFailed=(errors)=>
{

    return{
        type:LOGIN_FAILED,
        payload:errors
    }

}

export const logout =()=>{

    AuthService.invalidate()
    return{

        type:LOGOUT

    }

}

export const createBooking=(booking)=>{


    return axiosInstance.post('/bookings', booking)
    .then(response=>response.data
        //,errors=>Promise.reject(errors.response.data.errors)
    )
    .catch(errors=>Promise.reject(errors.response.data.errors))

}