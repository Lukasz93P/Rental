import React from 'react'
import * as moment from 'moment'
import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import Warnings from '../../shared/Warnings'



class BookingList extends React.Component {


    componentWillMount(){
        this.fetchRentalBookings()
    }

    fetchRentalBookings=()=>{
        const id=this.props.match.params.id

        this.props.dispatch(actions.fetchRentalBookings(id))
    }

    render(){
        const {bookings,errors}=this.props
        if(bookings && bookings.length>0)
        return(
            <div>
                {bookings.map((booking,index)=>
                
                
                <div key={index} className="card mb-3 text-secondary row justify-content-center" >
                    <div className="card-header text-center">{moment(booking.startAt).format('Y/MM/DD')} - {moment(booking.endAt).format('Y/MM/DD')}</div>
                    <div className="card-body">
                        <h5 className="card-title text-center">Receivables: {booking.totalPrice}</h5>
                        <p className="card-text text-center">Guests: {booking.guests}</p>
                        <p className="card-text text-center">Days: {booking.days}</p>
                    </div>
                </div>
                
                
                )}
            </div>

        )

        return(

            <div className='row justify-content-center'>
                <Warnings errors={errors}/>
            </div>

        )
        
    }

}

function mapStateToProps(state){
    return {
        bookings:state.rentalBookings.data,
        errors:state.rentalBookings.errors
    }
}




export default connect(mapStateToProps)(BookingList)