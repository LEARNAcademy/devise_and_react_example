import React from "react"
import PropTypes from "prop-types"
class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      apartments: []
    }
    
    this.getApartments()
  }
  
  getApartments(){
    fetch("/apartments")
    .then( response => {
      return response.json()
    })
    .then( apartments => {
      this.setState({apartments})
    })
  }
  render () {
    const {apartments} = this.state
    return (
      <React.Fragment>
        <h1>Apartments</h1>
        <ul>
          {apartments.map((apartment) => {
            return(
              <li key={apartment.id}>{apartment.street} {apartment.city}</li>
            )
          })}
        </ul>
      </React.Fragment>
    );
  }
}

export default Home
