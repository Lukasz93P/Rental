import React from 'react'
import * as moment from 'moment'
import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import Warnings from '../../shared/Warnings'
import isPassed from '../../../helpers/index'
import BookingListCard from './BookingListCard'



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
            
            <div className='row'>
                {bookings.map((booking,index)=><BookingListCard booking={booking} key={index}/>
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