import {LOGOUT,LOGIN_FAILED,LOGIN_SUCCESS} from "../actions/types";

const initialState={
    
    isAuth:false,
    errors:[],
    username:''

}

export const authReducer=(state=initialState,action)=>
{
    switch(action.type)
    {
        case LOGIN_SUCCESS:
            return Object.assign({},state,{isAuth:true,errors:[],username:action.payload})
        case LOGIN_FAILED:
            return Object.assign({},state,{errors:action.payload})
        case LOGOUT:
            return Object.assign({},state,{isAuth:false})     
        default:
            return state
    }
    
}