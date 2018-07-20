import React from 'react'
import * as actions from '../../../actions/index';
import {connect} from 'react-redux';
import BookingCard from './BookingsCard'

class BookingsManage extends React.Component{

    componentWillMount(){

        this.props.dispatch(actions.fetchUsersBookings())

    }

    render(){
        const {bookings}=this.props.bookingsManage
        
        if(bookings&&bookings.length>0)
            return(
                <div>
                    {bookings.map((booking,index)=> <BookingCard key={index} booking={booking}/>)}}
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