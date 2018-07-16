import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {getRangeOfDates,firstToUpper} from '../../helpers/index'
import { runInThisContext } from 'vm';
import * as moment from 'moment'
import BookingModal from './BookingModal'
import * as actions from '../../actions/index'
import { ToastContainer, toast } from 'react-toastify';


export class Booking extends React.Component {

    constructor(){
        super()
        this.outDates=[]
        this.dateInputRef=React.createRef()
        this.state={

            bookingStartDate:"",
            bookingEndDate:"",
            guests:1,
            open:false,
            errors:[]

        }
    }
    
    
    componentWillMount(){

        this.getBookedOutDates()
        

    }


    getBookedOutDates=()=>{

        const {bookings}=this.props.rental

        
        if(bookings && bookings.length >0)
            bookings.forEach(booking=>{

                const dateRangeFromEachBooking =getRangeOfDates(booking.startAt,booking.endAt,'Y/MM/DD')
                this.outDates.push(...dateRangeFromEachBooking)
            })


    }

    isInvalidDate=(date)=>{

        return this.outDates.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0
    }

    dateApplyHandler=(event,picker)=>{

        this.setState({bookingStartDate:picker.startDate.format('Y/MM/DD'), bookingEndDate:picker.endDate.format('Y/MM/DD')})
        this.dateInputRef.current.value= `${picker.startDate.format('Y/MM/DD')} to ${picker.endDate.format('Y/MM/DD')}` 
    }

    setGuestsQuantity=(event)=>{

        const declaredGuestQuantity=parseInt(event.target.value, 10)
        this.setState({guests:declaredGuestQuantity})

    }

    sendBookingToServer=()=>{


        
        const booking={startAt:this.state.bookingStartDate,
            endAt:this.state.bookingEndDate,
            days:this.state.days,
            totalPrice:this.state.totalPrice,
            guests:this.state.guests,
            rental:this.state.rental,
        }

        actions.createBooking(booking)
        .then(
            response=>{this.addNewOutDates(booking),this.rejectBookingConfirmation(),this.successMessage(),this.clearInput()}
            ,
            errors=>{this.setState({errors:errors, open:true})}

            
        )
        

    }

    openModal=()=>{
        
        this.setState({open:true})

        const {rental}=this.props
        const {bookingStartDate,bookingEndDate}=this.state
        const days=getRangeOfDates(bookingStartDate,bookingEndDate,'Y/MM/DD').length
        const totalPrice=rental.dailyRate*days-1

        this.setState({days,totalPrice, rental})

    }

    rejectBookingConfirmation=()=>{

        this.setState({open:false})

    }

    addNewOutDates=(booking)=>{
        
        const newOutDates=getRangeOfDates(booking.startAt,booking.endAt,'Y/MM/DD')
        this.outDates.push(...newOutDates)
    
    }

    clearInput=()=>{
        
        this.setState({bookingStartDate:"",
        bookingEndDate:"",
        guests:1,})

        this.dateInputRef.current.value=""
    }

    successMessage =()=>{
        const {bookingStartDate,bookingEndDate,guests,rental}=this.state
        
        toast(`Between ${bookingStartDate} and ${bookingEndDate} rental in ${firstToUpper(rental.city)} is for You${guests>1 ? ` and Your ${guests-1} guests` : ``}`);
    
    }


    render() {
        const {rental}=this.props
        const {guests,bookingStartDate, bookingEndDate,open,days,totalPrice, errors}=this.state
        return (
        <div className='booking'>
            <h3 className='booking-price'>$ {rental.dailyRate} <span className='booking-per-night'>per night</span></h3>
            <hr></hr>
            <div className='form-group'>
                <label htmlFor='dates'>Dates</label>
                <DateRangePicker onApply={this.dateApplyHandler} isInvalidDate={this.isInvalidDate} opens='left' containerStyles={{display:'block'}}>
                    <input id='dates' ref={this.dateInputRef} type='text' className='form-control'></input>
                </DateRangePicker>
            </div>
            <div className='form-group'>
            <label htmlFor='guests'>Guests</label>
            <input value={guests} min='1' max={rental.bedrooms + 4} onChange={this.setGuestsQuantity}  type='number' className='form-control' id='guests' aria-describedby='emailHelp' placeholder=''></input>
            </div>
            <button onClick={this.openModal} className='btn btn-bwm btn-confirm btn-block'
            disabled={bookingStartDate==='' || bookingEndDate==='' || guests===0}
            >Reserve place now</button>
            <hr></hr>
            <p className='booking-note-title'>People are interested into this house</p>
            <p className='booking-note-text'>
            More than 500 people checked this rental in last month.
            </p>
            <BookingModal open={open} close={this.rejectBookingConfirmation} 
            confirm={this.sendBookingToServer} rental={rental} starting={bookingStartDate} 
            ending={bookingEndDate} guests={guests} days={days} totalPrice={totalPrice} errors={errors}/>
            <ToastContainer position="top-center"/>
        </div>
        )
    }
}