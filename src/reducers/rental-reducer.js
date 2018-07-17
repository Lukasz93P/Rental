import {FETCH_RENTALS_INIT,FETCH_RENTALS_FAILED,FETCH_RENTALS_SUCCESS,FETCH_RENTAL_BY_ID_SUCCESS,FETCH_RENTAL_BY_ID_PENDING} from "../actions/types";

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