import React from 'react'
import * as actions from '../../../actions/index';
import {connect} from 'react-redux';
import BookingCard from './BookingsCard'
import Warnings from '../../shared/Warnings'
import {Link} from 'react-router-dom'

class BookingsManage extends React.Component{

    componentWillMount(){

        this.props.dispatch(actions.fetchUsersBookings())

    }

    render(){
        const {bookings,errors}=this.props.bookingsManage
        
        if(bookings&& bookings.length>0)
            return(
                <div className="row">
                    {bookings.map((booking,index)=> <BookingCard key={index} booking={booking}/>)}
                </div>
            )
            return(

            <div>
                <Warnings errors={errors}/>
                <div className='row justify-content-center'>
                    <Link to='/rentals'><button className='btn btn-lg btn-primary'>{`Let\'s change it!`}</button></Link>
                </div>
            </div>


        )
    }


}

function mapStateToProps(state){
    return {
        bookingsManage:state.bookingsManage,
    }
}




export default connect(mapStateToProps)(BookingsManage)