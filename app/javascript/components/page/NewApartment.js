import React from "react"
import PropTypes from "prop-types"
class NewApartment extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      form: {
        street: "",
        city: ""
      }
    }
  }
  
  onChange= (e) =>{
    const{ form } = this.state
    const{ name, value } = e.target
    form[name] = value
    this.setState({form})
  }
   
  localSubmit = () =>{
    const{ onSubmit } = this.props 
    const{ form } = this.state
    onSubmit(form)
  } 
  render () {
    const{ street, city } = this.state
    return (
      <React.Fragment>
        <h1>New Apartment</h1>
        <div>
          <label>Street</label>
          <input 
            name="street" 
            value={street} 
            onChange = { this.onChange }
            type='text' 
          />
        </div>
        <div>
          <label>City</label>
          <input 
            name="city" 
            value={city} 
            onChange = { this.onChange }
            type='text' 
          />         
        </div>
        
        <button onClick={this.localSubmit} >Submit</button>
      </React.Fragment>
    );
  }
}

export default NewApartment
