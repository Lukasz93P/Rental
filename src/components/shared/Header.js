import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import SearchInput from '../rental/rental-listing/SearchInput'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import * as helpers from '../../helpers/index'
import NotificationDropdown from '../notifications/NotificationDropdown'

class Header extends Component {

    constructor(){
        super()
        this.state={
            city:""
        }
    }

    setSearchedCity=(event)=>{

        const city=event.target.value
        this.setState({city})

    }


    
    search=(event)=>{
        
        event.preventDefault()
        const {city}=this.state
        city ? this.props.history.push(`/rentals/${city}/homes`) : this.props.history.push(`/rentals`)
        event.target.elements.searchInput.value=""
        this.setState({city:""})
    
    }


    renderLinks=()=>{
        const { logout, auth}=this.props
        if(auth.isAuth)
            return(
                <div className='navbar-nav ml-auto form-inline'>
                    <a className='nav-item nav-link'>{helpers.firstToUpper(auth.username)}</a>
                    <a className='nav-item nav-link logout' onClick={logout}>Logout</a>
                    <div className="nav-item dropdown">
                            <a className="nav-link nav-item dropdown-toggle clickable" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Owner Section
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to="/rentals/new">Create Rental</Link>
                                <Link className="dropdown-item" to="/rentals/manage">Manage Rentals</Link>
                                <Link className="dropdown-item" to="/bookings/manage">Manage Bookings</Link>
                            </div>
                    </div>
                </div>
            ) 
        
        return(
            <div className='navbar-nav ml-auto form-inline'>
                <Link to='/login' className='nav-item nav-link active' >Login <span className='sr-only'>(current)</span></Link>
                <Link to='/register' className='nav-item nav-link' href=''>Register</Link>
            </div>
        )

    }

    render(){
        const { logout, auth}=this.props

        return(
            <nav className='navbar navbar-dark navbar-expand-lg'>
                <div className='container'>
                    <Link className='navbar-brand' to='/rentals'>BookWithMe</Link>
                    <SearchInput  setSearchedCity={this.setSearchedCity} search={this.search}/>
                    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                    {this.renderLinks()}
                    </div>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state){
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps)(withRouter(Header))


