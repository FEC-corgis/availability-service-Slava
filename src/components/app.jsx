import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyId: 20,
      reservations: []
    };
  }

  componentDidMount() {
    axios.get(`/availability?propertyId=${this.state.propertyId}`)
      .then((resp)=> {
        console.log('RESPONSE DATA', resp.data);
        this.setState({
          reservations: resp.data
        })
      })
  }

  render () {
    return (
      <div>
        heylo there my
      </div>
    )
  }
}

export default App;