import React, { Component } from 'react'
import axios from 'axios'

class Commute extends Component {

constructor(props) {
  super(props)
  this.state = {
    data: []
  }
}

componentDidMount(){
  this.getData()
}

getData() {
  axios
    .post(`api/address`)
    .then(res => {
      console.log(res.data)
      this.setState({
        data: res.data
      })
    })
    .catch(err => console.log(err))
}


render(){
  return(
    <div>{this.state.data}</div>
  )
}
}

export default Commute