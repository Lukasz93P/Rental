import {FETCH_RENTALS_SUCCESS,FETCH_RENTAL_BY_ID_SUCCESS,FETCH_RENTAL_BY_ID_PENDING} from "./types"
import axios from 'axios';


export const fetchRentals=()=>{

    return dispatch=>{

        axios.get('http://localhost:3000/api/v1/rentals')
            .then(response=>dispatch(fetchRentalsSuccess(response.data)))

    }

}

export const fetchRentalsSuccess=(rentals)=>{

    return{

        type:FETCH_RENTALS_SUCCESS,
        payload:rentals,

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