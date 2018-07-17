import React, {Component}from 'react'

class SearchInput extends Component{

    render(){
        const {search,setSearchedCity,onEnter}=this.props
        return(

            <div className='form-inline my-2 my-lg-0'>
                <input onKeyPress={onEnter} onChange={setSearchedCity} className='form-control mr-sm-2 bwm-search' type='search' placeholder='Try "New York"' aria-label='Search'></input>
                <button  onClick={search} className='btn btn-outline-success my-2 my-sm-0 btn-bwm-search' type='submit'>Search</button>
            </div>
        )
    }


}
export default SearchInput