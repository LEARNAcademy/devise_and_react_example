import React from "react"
import PropTypes from "prop-types"
import {
  BrowserRouter as Router, 
  Link,
  Route, 
  Switch
} from 'react-router-dom'

import Home from './page/Home'
import NewApartment from './page/NewApartment'

class MainApp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      apartments: [],
      error: null,
    }
    this.getApartments()
  }
  
  getApartments = () => {
    fetch("/apartments")
    .then( response => {
      return response.json()
    })
    .then( apartments => {
      this.setState({apartments})
    })
  }
  
  createApartment = (attrs) =>{
    return fetch("/apartments",{
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({apartment: attrs})
    })
    .then(response => {
      if(response.status === 201){
        this.getApartments()
      }
    })
  }
  
  editApartment = (id, attrs) => {
    console.log("editing", id, attrs) 
  }
  
  deleteApartment = (id) =>{
    return fetch(`/apartments/${id}`, {
        method: 'DELETE'
      }
    ).then(response => {
      if(response.status === 200){
        this.getApartments()
      }else{
        response.json()
        .then(payload => {
          this.setState({error: payload.error})
        })
      }
    })

  }
 
  render () {
    const{ 
      logged_in, 
      sign_out_route, 
      sign_in_route,
      current_user_id,
    } = this.props
    
    const{ apartments, error } = this.state 
    
    return (
      <React.Fragment>
        {error &&
          <h2>{error}</h2>
        }
        
        <Router>
          <div className="TopNav">
            <div>
              <Link to="/">Home</Link>
            </div>
            {logged_in &&
              <div>
                <Link to="/new-apartment" >New Apartment</Link>
                <a href={sign_out_route}>Log Out</a>
              </div>
            }
            {!logged_in &&
              <div>
                <a href={sign_in_route}>Log In</a>
              </div>
            }
          </div>
          <Route 
            exact 
            path="/"
            render={ (props) => {
              return(
                <Home 
                  {...props} 
                  currentUserId = {current_user_id}
                  apartments={apartments} 
                  deleteAction = {this.deleteApartment}
                />
              )
            }}
          />
          
          {logged_in &&
            <Switch>
              <Route 
                path="/new-apartment" 
                render={ (props) => {
                  return(
                    <NewApartment 
                      {...props}
                      onSubmit={this.createApartment}
                    />
                  )
                }}
              />
              <Route
                path="/edit-apartment/:id"
                render={ (props) => {
                  return(
                    <EditApartment
                      {...props}
                      onSubmit={this.editApartment}
                    />
                  )
                }}
              />
            </Switch>
          }

        </Router>
      
      </React.Fragment>
    );
  }
}

export default MainApp
