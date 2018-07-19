import React from 'react'
import * as actions from '../../../actions/index';
import {connect} from 'react-redux';

class BookingsManage extends React.Component{

    componentWillMount(){

        this.props.dispatch(actions.fetchUsersBookings())

    }

    render(){
        const {bookings}=this.props.bookingsManage
        
        if(bookings&&bookings.length>0)
            return(
                <div>
                    {bookings.map((booking,index)=> <p key={index}>{booking.startAt}</p>)}
                </div>
            )
        return(

            <h1>Rental Manage</h1>


        )
    }


}

function mapStateToProps(state){
    return {
        bookingsManage:state.bookingsManage,
    }
}




export default connect(mapStateToProps)(BookingsManage)