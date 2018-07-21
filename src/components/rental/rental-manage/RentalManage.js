import React from 'react'
import * as actions from '../../../actions/index';
import {connect} from 'react-redux';
import RentalManageCard from './RentalManageCard'
import { ToastContainer, toast } from 'react-toastify';
import {Link} from 'react-router-dom'
import Warnings from '../../shared/Warnings'

class RentalManage extends React.Component{



    componentWillMount(){

        this.props.dispatch(actions.fetchUsersRentals())

    }

    delete=(rentalId)=>{

        actions.deleteRental(rentalId)
        .then(
            response=>{this.props.dispatch(actions.fetchUsersRentals()) }
            ,
            errors=>this.alertMessage(errors)

        )
    }


    alertMessage =(errors)=>{
          
        toast.warn(errors[0].detail)

    }

    render(){
        const {rentals,errors}=this.props.rentalsManage
        if(rentals&&rentals.length>0)
            return(
                <div className='row container '>
                    {rentals.map((rental,index)=> <RentalManageCard onDelete={this.delete} className='p-3 m-3 d-inline-blok ' key={index} rental={rental}/>)}
                    <ToastContainer typeposition="top-center"/>                
               </div>
            )
        return(

            <div>
                <Warnings errors={errors}/>
                <div className='row justify-content-center'>
                    <Link to='/rentals/new'><button className='btn btn-lg btn-primary'>{`Let\'s change it!`}</button></Link>
                </div>
            </div>
            


        )
    }


}

function mapStateToProps(state){
    return {
        rentalsManage:state.rentalsManage,
    }
}




export default connect(mapStateToProps)(RentalManage)