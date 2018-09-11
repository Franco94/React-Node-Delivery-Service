import React, {Component} from 'react';
//import logo from './logo.svg';
import './styles.css';
import DeliveryRequest from './scenes/DeliveryRequest';

class App extends Component {
  render() {
    return (<DeliveryRequest/>);
  }
}

/*
  state = {
    meals: []
  }

  componentDidMount() {
    fetch('/meals').then(res => res.json()).then(meals => this.setState({meals}));
  }

  render() {
    return (<div className="App">
      <h1>Meals</h1>
      {this.state.meals.map(meal => <div key={meal.id}>{meal.name}</div>)}
    </div>);
  }
}*/

/*
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}*/

export default App;
