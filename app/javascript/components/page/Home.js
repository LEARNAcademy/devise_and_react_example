import React from "react"
import PropTypes from "prop-types"
class Home extends React.Component {
 

  render () {
    const {
      apartments,
      currentUserId,
      deleteAction
    } = this.props
    return (
      <React.Fragment>
        <h1>Apartments</h1>
        <ul>
          {apartments.map((apartment) => {
            return(
              <li 
                key={apartment.id}
              >
                {apartment.street} {apartment.city}
                {apartment.user_id === currentUserId &&
                  <button onClick={()=> deleteAction(apartment.id)}>delete</button>
                }
              </li>
            )
          })}
        </ul>
      </React.Fragment>
    );
  }
}

export default Home
