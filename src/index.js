import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


class Button extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            counter: 0,
        }
    }
    handleClick = () =>{
        this.setState({
            counter: this.state.counter+100,
        })
    }
    render()
    {
        return(
            <div>
            <button onClick={this.handleClick}> Just Do It: </button>
            <p>{this.state.counter}</p>
            </div>
        )
    }
}

ReactDOM.render(<Button />, root);
//ReactDOM.render(<App label="Do"/>, document.getElementById('root'));
registerServiceWorker();
