import React from 'react'
import RentalCreateForm from './RentalCreateForm'
import * as actions from '../../../actions';
import {withRouter} from 'react-router-dom'


class RentalCreate extends React.Component{

    constructor(){

        super()
        this.state={
            errors:[],
        }
        this.rentalCategories=[{value:'house', label:'House'}, {value:'condo', label:'Condo'},{value:'apartment', label:'Apartment'}]

    }

    

    onFormSubmit=(values)=>{
        const newRental={...values}
        actions.addRental(newRental)
        .then(response=>this.props.history.push(`/rentals/${response._id}`)
            
        )
        .catch(err=> this.setState({errors:err}))        
    }



    render(){
        const {errors}=this.state
        return(

            <section id='newRental'>
                <div className='bwm-form'>
                    <div className='row'>
                    <div className='col-md-5'>
                        <h1 className='page-title'>Create Rental</h1>
                        <RentalCreateForm rentalCategories={this.rentalCategories} errors={errors} onFormSubmit={this.onFormSubmit}/>
                    </div>
                    <div className='col-md-6 ml-auto'>
                        <div className='image-container'>
                        <h2 className='catchphrase'>Hundreds of awesome places in reach of few clicks.</h2>
                        <img src={process.env.PUBLIC_URL + '/img/create-rental.jpg'} alt=''/>
                        </div>
                    </div>
                    </div>
                </div>
            </section>

        )



    }


}

export default withRouter(RentalCreate)