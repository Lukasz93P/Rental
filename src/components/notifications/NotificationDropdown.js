import React from 'react'
import * as actions from '../../actions/index'
import {connect} from 'react-redux';
//import Warnings from '../../shared/Warnings'
import DropdownMenuNotification from './DropdownMenuNotification'

class NotificationDropdown extends React.Component{

    componentWillMount(){

        this.props.dispatch(actions.fetchUsersNotifications())

    }


    render(){
        const {notifications,errors}=this.props.notifications
        
        if(notifications&& notifications.length>0)
            return(
                <div className="row w-100">
                    
                    <div class="dropdown dropDownOpen">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {`${notifications.length} notifications`}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {notifications.map((notification,index)=>{if(notification.new) return <DropdownMenuNotification key={index} notification={notification}/>})}
                        </div>
                    </div>

                </div>
            )

            return(

            <div>
            </div>
        )
    }


}

function mapStateToProps(state){
    return {
        notifications:state.notifications,
    }
}




export default connect(mapStateToProps)(NotificationDropdown)