import {LOGIN_FAILED,LOGIN_SUCCESS} from "../actions/types";

const initialState={
    
    isAuth:false,
    token:'',
    errors:[]

}

export const authReducer=(state=initialState,action)=>
{
    switch(action.type)
    {
        case LOGIN_SUCCESS:
            return Object.assign({},state,{isAuth:true,token:action.payload,errors:[]})
        case LOGIN_FAILED:
            return Object.assign({},state,{errors:action.payload})
        
        default:
            return state
    }
    
}