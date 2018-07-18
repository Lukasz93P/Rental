import React, {Component}from 'react'

class SearchInput extends Component{

    constructor(){

        super()
    }

    render(){
        const {search,setSearchedCity}=this.props
        
        return(

            <form onSubmit={search} className='form-inline my-2 my-lg-0'>
                <input  name="searchInput"onChange={setSearchedCity} className='form-control mr-sm-2 bwm-search' type='search' placeholder='Try "New York"' aria-label='Search'></input>
                <button type="submit" className='btn btn-outline-success my-2 my-sm-0 btn-bwm-search' type='submit'>Search</button>
            </form>
        )
    }


}
export default SearchInput