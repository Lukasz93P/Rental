import React from 'react'
import * as moment from 'moment'
import {connect} from 'react-redux';
import * as actions from '../../../actions/index';

class BookingList extends React.Component {


    componentWillMount(){
        this.fetchRentalBookings()
    }

    fetchRentalBookings=()=>{
        const id=this.props.match.params.id

        this.props.dispatch(actions.fetchRentalBookings(id))
    }

    render(){
        const {bookings,error}=this.props
        if(bookings && bookings.length>0)
        return(
            <div>
                {bookings.map((booking,index)=>
                
                
                <div key={index} className="card text-white bg-success mb-3" >
                    <div className="card-header text-primary">{moment(booking.startAt).format('Y/MM/DD')} - {moment(booking.endAt).format('Y/MM/DD')}</div>
                    <div className="card-body">
                        <h5 className="card-title text-primary">Receivables: {booking.totalPrice}</h5>
                        <p className="card-text text-primary">Guests: {booking.guests}</p>
                        <p className="card-text text-primary">Days: {booking.days}</p>
                    </div>
                </div>
                
                
                )}
            </div>

        )
        if(error && error.length>0)
        return(

            <div className='alert alert-warning row justify-content-md-center'>
                <div className='col-6 '><h2>{error[0].detail}</h2></div>
            </div>

        )
        else return(
        <div>
        </div>
        )
        
    }

}

function mapStateToProps(state){
    return {
        bookings:state.rentalBookings.data,
        error:state.rentalBookings.errors
    }
}




export default connect(mapStateToProps)(BookingList)