import React from 'react';
import 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './awesomeFont/css/all.css';
import './game.css';
import _ from 'lodash';

var possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
      var combinationSum = 0;
      for (var j=0 ; j < listSize ; j++) {
        if (i & (1 << j)) { combinationSum += arr[j]; }
      }
      if (n === combinationSum) { return true; }
    }
    return false;
  };

const Stars = (props) =>{
    
    return(
        <div className="col-5"> 
        {_.range(1,props.numberOfStars+1).map(i =>
        <i key={i} className="fa fa-star"></i>
        )}
        </div>
    );
};

const Button = (props) =>{
    let button;
    switch(props.answerIsCorrect){
        case true:
        button = 
        <button onClick={props.acceptAnswer}
        className="btn btn-success"><i className="fa fa-check"> </i></button>;
        break;
        case false:
        button = 
        <button className="btn btn-danger"><i className="fa fa-times"> </i></button>;
        break;
        default:
            button = 
            <button 
            onClick={props.checkAnswer}
            className="btn" 
            disabled={props.selectedNumbers.length === 0}> 
            = 
            </button>;
        break;
    }
    return(
        <div className="col-2">
        {button}
        <br /> <br />
        <button 
            onClick={props.redraw}
            className="btn btn-warning btn-sm"
            disabled={props.redraws === 0}>
        <i className="fa fa-refresh"></i> {props.redraws}
        </button>
        </div>
    );
};

const Answer = (props) =>{
    return(
        <div className="col-5">
        {props.selectedNumbers.map((number,i) =>
        <span onClick={() => props.unSelectedNumber(number)} key={i}>{number}</span>)}
        </div>
    );
};

const Numbers = (props) =>{
    const numberClassName = (number) =>{
        if(props.selectedNumbers.indexOf(number) >= 0){
            return 'selected';
        }
        if(props.usedNumbers.indexOf(number) >= 0){
            return 'used';
        }
    }
    return(
        <div className="card text-center">
            <div>
                {Numbers.list.map((number,i)=> 
                <span onClick={() => props.selectedNumber(number)} 
                key={i} className={numberClassName(number)}> {number}</span>)}
            </div>
        </div>
    );
};

const DoneFrame = (props) =>{
    return(
        <div className="text-center"> 
            <h2>{props.doneStatus}</h2>
            <button 
            onClick={props.resetGame}
            className="btn btn-secondary">Play Again!</button>
        </div>
    )
}

Numbers.list = _.range(1,10);

class Game extends React.Component{
    static randomNumber = () => 1 + Math.floor(Math.random()*9);
    static initialState = () => ({
        selectedNumbers:[],
        usedNumbers: [],
        numberOfStars: Game.randomNumber(),
        answerIsCorrect: null,
        redraws: 5,
        doneStatus: null,
    });
    state = Game.initialState();
    selectedNumber = (clickedNumber) =>{
        if(!this.state.selectedNumbers.includes(clickedNumber)){
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
        }));};
    };
    unSelectedNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber )
        }))
    };
    checkAnswer = () =>{
        this.setState(prevState => ({
            answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((acc,n) => acc+n,0),
        }));
    }
    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            numberOfStars: Game.randomNumber()
        }), () => this.updateDoneStatus());
    }
    redraw = () =>{
        if(this.state.redraws > 0){
        this.setState(prevState => ({
            numberOfStars: Game.randomNumber(),
            answerIsCorrect: null,
            selectedNumbers: [],
            redraws: prevState.redraws -1,
        }), () => this.updateDoneStatus());
        };
    }
    updateDoneStatus = () => {
        this.setState(prevState => {
            if(prevState.usedNumbers.length === 9){
                return{doneStatus: 'Done. Nice!'}      
            }
            if(prevState.redraws === 0 && !this.possibleSolutions(prevState)){
                return{doneStatus: 'Gave Over'}
            }
        }
    );
    }

    possibleSolutions = ({numberOfStars, usedNumbers}) => {
        const possibleNumbers = _.range(1,10).filter(number => usedNumbers.indexOf(number) === -1);
        return possibleCombinationSum(possibleNumbers, numberOfStars);
    }
    resetGame = () => {
        this.setState(Game.initialState());
    }

    render(){
        const {selectedNumbers, numberOfStars, answerIsCorrect, usedNumbers, redraws, doneStatus} = this.state;
        return(
            <div className="cointainer"> 
                <h3> Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars={numberOfStars}/>
                    <Button selectedNumbers={selectedNumbers}
                            checkAnswer={this.checkAnswer}
                            answerIsCorrect={answerIsCorrect}
                            acceptAnswer={this.acceptAnswer}
                            redraw={this.redraw}
                            redraws={redraws}
                    />
                    <Answer selectedNumbers={selectedNumbers}
                            unSelectedNumber={this.unSelectedNumber}/>
                </div>
                <br />
               { !doneStatus ? 
                <Numbers selectedNumbers={selectedNumbers}
                        selectedNumber={this.selectedNumber} 
                        usedNumbers={usedNumbers}/>
                  :
                <DoneFrame 
                resetGame={this.resetGame}
                doneStatus={doneStatus} />
               }
            </div>
        );
    }
}



class AppGame extends React.Component{
    render(){
        return(
            <div>
                <Game />
                
            </div>
        );
    }
}

export default AppGame;