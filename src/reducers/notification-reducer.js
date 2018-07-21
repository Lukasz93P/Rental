import {FETCH_USERS_NOTIFICATIONS_SUCCESS} from "../actions/types";

const initialState={
    
    notifications:
    {
        notifications:[],
        errors:[],
    }

}

export const NotificationReducer=(state=initialState.notifications,action)=>
{
    switch(action.type)
    {
        case FETCH_USERS_NOTIFICATIONS_SUCCESS:
            return Object.assign({},state,{notifications:action.payload})
        default:
            return state
    }
    
}
