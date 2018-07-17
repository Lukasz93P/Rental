import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import SearchInput from '../rental/rental-listing/SearchInput'
import {withRouter} from 'react-router-dom'

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

    onEnter=(event)=>{
        if(event.key==='Enter')
            this.search()
    }
    
    search=()=>{
        
        const {city}=this.state
        console.log('!!!!!!!', city)
        city ? this.props.history.push(`/rentals/${city}/homes`) : this.props.history.push(`/rentals`)
          
    
    }

    render(){
        const {search, logout}=this.props

        return(
            <nav className='navbar navbar-dark navbar-expand-lg'>
                <div className='container'>
                    <Link className='navbar-brand' to='/rentals'>BookWithMe</Link>
                    <SearchInput onEnter={this.onEnter} setSearchedCity={this.setSearchedCity} search={this.search}/>
                    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                        <div className='navbar-nav ml-auto'>
                            <Link to='/login' className='nav-item nav-link active' >Login <span className='sr-only'>(current)</span></Link>
                            <Link to='/register' className='nav-item nav-link' href=''>Register</Link>
                            <p className='nav-item nav-link logout' onClick={logout}>Logout</p>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default withRouter(Header)