import {FETCH_RENTALS_SUCCESS,FETCH_RENTAL_BY_ID_SUCCESS,FETCH_RENTAL_BY_ID_PENDING} from "../actions/types";

const initialState={
    
    rentals:
    {
        data:[],
    }
    ,
    rental:{
        data:[],
        isPending:false,
    }

}

export const RentalReducer=(state=initialState.rentals,action)=>
{
    switch(action.type)
    {
        case FETCH_RENTALS_SUCCESS:
            return Object.assign({},state,{data:action.payload})
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