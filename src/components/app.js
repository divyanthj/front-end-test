import React, { Component } from 'react'
import fetch from 'isomorphic-fetch';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      pizzas : []
    };

  }

  componentDidMount() {
    fetch('/pizza.json').then((response) => {
      return response.json();;
    }).then((data) => {
      this.setState({
        pizzas : data.pizzas,
        displayedPizzas : data.pizzas,
        isLoading : false
      });
    });
  }

  activateFilter(event) {
    const {displayedPizzas, pizzas} = this.state;
    this.setState({
      displayedPizzas : pizzas.filter((pizza) => {
        return pizza.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1;
      })
    });
  }

  sortAscending() {
    const {displayedPizzas, pizzas} = this.state;
    let result = displayedPizzas.sort();
    this.setState({
      displayedPizzas : result
    });
  }

  sortDescending() {
    const {displayedPizzas, pizzas} = this.state;
    let result = displayedPizzas.sort();
    result.reverse();
    this.setState({
      displayedPizzas : result
    });
  }

  render() {
    const { pizzas, isLoading, displayedPizzas } = this.state;
    if(isLoading) {
      return (<p>Loading</p>);
    } else {
      const pizzaList = displayedPizzas.map((pizza) => {
            return (
              <li key={pizza}>
                {pizza}
              </li>
            )
          });

      return (
        <div>
          <input placeholder='Filter' onChange={this.activateFilter.bind(this)}></input>
          <button onClick={this.sortAscending.bind(this)}>Sort Ascending</button>
          <button onClick={this.sortDescending.bind(this)}>Sort Descending</button>
          <ul>{pizzaList}</ul>
        </div>

      );
    }

  }
}

export default App;
