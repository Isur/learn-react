import React, { Component } from 'react';
import './App.css';

class Button extends React.Component{
  handleClick = () => {
   this.props.onClickFunction(this.props.incrementValue);   
  }
  render()
  {
      return(
          <div>
            <button onClick={this.handleClick}> Just Do It +{this.props.incrementValue} </button>
          </div>
      )
  }
}

const Result = (props) =>{
  return (
      <div> 
          {props.counter}
      </div>
  );
};

class App extends Component {
  state = {
    counter: 0,
  };

  incrementCounter = (incrementValue) =>{
    this.setState((prevState) => ({
      counter: prevState.counter +incrementValue,
    }));
  }

  render() {
    return (
      <div className="App">
        <Button incrementValue={1} onClickFunction={this.incrementCounter}/>
        <Button incrementValue={5} onClickFunction={this.incrementCounter}/>
        <Button incrementValue={10} onClickFunction={this.incrementCounter}/>
        <Button incrementValue={100} onClickFunction={this.incrementCounter}/>
        <Result counter={this.state.counter}/>
      </div>
    );
  }
}

export default App;
