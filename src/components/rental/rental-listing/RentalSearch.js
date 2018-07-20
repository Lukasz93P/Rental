import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import RentalList from "./RentalList"
import RentalNotFound from './RentalNotFound';
import * as helpers from '../../../helpers/index'


class RentalSearch extends Component{

    constructor(){
        super()
        this.state={
            city:'',
        }
    }

    componentWillMount(){
        this.fetchSearchedRentals()
    }

    fetchSearchedRentals=()=>{
        const city=this.props.match.params.city
        this.props.dispatch(actions.fetchRentals(city))
    }

    componentDidUpdate=(previousParams)=>{

        const currentlURL=this.props.match.params.city
        const previousURL=previousParams.match.params.city
        if(currentlURL!==previousURL)
            this.fetchSearchedRentals()

    }


    render(){
        const {city}=this.state
        const {rentals,errors}=this.props
        const areErrors=errors.length===0 ? false :true
        return(
            <section id='rentalListing'>
                {areErrors &&
                <div>
                    {errors.map((error,index)=> <h1 key={index}>{error.detail}</h1>) }
                    <RentalNotFound/>
                </div>
                }
                {!areErrors && 
                <div>
                    <h1 className='page-title'>Your Home in {helpers.firstToUpper(city)}</h1>
                    <RentalList  rentals={rentals}/>
                </div>}  
            </section>
        )
    }
}

function mapStateToProps(state){
    return {
        rentals:state.rentals.data,
        errors:state.rentals.errors,
    }
}




export default connect(mapStateToProps)(RentalSearch)