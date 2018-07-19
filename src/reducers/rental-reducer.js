import {FETCH_USERS_BOOKINGS_SUCCESS, FETCH_USERS_BOOKINGS_FAILED,FETCH_USERS_BOOKINGS_INIT,FETCH_USERS_RENTALS_FAILED,FETCH_USERS_RENTALS_INIT,FETCH_USERS_RENTALS_SUCCESS,FETCH_RENTALS_INIT,FETCH_RENTALS_FAILED,FETCH_RENTALS_SUCCESS,FETCH_RENTAL_BY_ID_SUCCESS,FETCH_RENTAL_BY_ID_PENDING} from "../actions/types";

const initialState={
    
    rentals:
    {
        data:[],
        errors:[],
    }
    ,
    rental:{
        data:[],
        isPending:false,
    }
    ,
    rentalsManage:{

        rentals:[],
        errors:[]

    }
    ,
    bookingsManage:{

        bookings:[],
        errors:[]

    }

}

export const RentalReducer=(state=initialState.rentals,action)=>
{
    switch(action.type)
    {
        case FETCH_RENTALS_SUCCESS:
            return Object.assign({},state,{data:action.payload})
        case FETCH_RENTALS_INIT:
            return Object.assign({},state, {errors:[],data:[]})
        case FETCH_RENTALS_FAILED:
            return Object.assign({},state,{errors:action.payload, data:[]})
        default:
            return state
    }
    
}

export const selectedRentalReducer=(state=initialState.rental,action)=>{
    switch(action.type)
    {
        case FETCH_RENTAL_BY_ID_SUCCESS:   
        return Object.assign({},state,{data:action.payload, isPending:action.isPending})
        case FETCH_RENTAL_BY_ID_PENDING:{
            return Object.assign({},state, {isPending:action.payload})
        }
        default:
            return state
    }

}

export const RentalManageReducer=(state=initialState.rentalsManage,action)=>
{
    switch(action.type)
    {
        case FETCH_USERS_RENTALS_SUCCESS:
            return Object.assign({},state,{rentals:action.payload})
        case FETCH_USERS_RENTALS_INIT:
            return Object.assign({},state, {errors:[],rentals:[]})
        case FETCH_USERS_RENTALS_FAILED:
            return Object.assign({},state,{errors:action.payload, rentals:[]})
        default:
            return state
    }
    
}

export const BookingsManageReducer=(state=initialState.bookingsManage,action)=>
{
    switch(action.type)
    {
        case FETCH_USERS_BOOKINGS_SUCCESS:
            return Object.assign({},state,{bookings:action.payload})
        case FETCH_USERS_BOOKINGS_INIT:
            return Object.assign({},state, {errors:[],bookings:[]})
        case FETCH_USERS_BOOKINGS_FAILED:
            return Object.assign({},state,{errors:action.payload, bookings:[]})
        default:
            return state
    }
    
}