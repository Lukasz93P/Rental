import React from 'react'

export class FileInput extends React.Component{
 

    onChange=(event)=>{

        const {input:{onChange}}=this.props
        onChange("https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_960_720.jpg"/*event.target.value*/)
    }
 
    render(){
        const {label,meta: { touched, error}}=this.props
        return(
        <div className='form-group'>
            <label>{label}</label>
            <div className='input-group'>
              <input type='file' accept='.jpg, .png, .jpeg' 
                onChange={this.onChange}
              />
              </div>
              {touched &&
                ((error && <div className='alert alert-danger'>{error}</div>))}
          </div>


        )
    }
 
 

}