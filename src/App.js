import React, { Component } from 'react';
import './App.css';
import './Square';
import Square from './Square';

class App extends Component {
  constructor(props) {

    super(props);
    this.state = {
      value: Array(9).fill(null),
      theXorO: true,
      scoreX: 0,
      scoreO: 0,
      playGame: true,
      display: true,
    }
    this.clickIsSquare = this.clickIsSquare.bind(this);
  }

  setXorO() {
   return this.state.theXorO ? 'X' : 'O';
  }

  clickIsSquare(sq) {
    if (this.state.value[sq] !== null) return;
    if (!this.state.playGame) return;
    const squares = [...this.state.value];
        squares[sq] = this.setXorO();
        this.setState(
          (prevState) => { return { value: squares, theXorO: !this.state.theXorO, } },
          () => this.processingOfGold(),
        );
  }
  render() {
    
    return (
      
      <div className="Container">
        <div className="Main"></div>
        <div 
          className="Winner" 
          hidden={ this.state.display }
          >winner: {'X' === this.setXorO() ? 'O' : 'X'}
        </div>

        <div className="Status"> 
          <span>Step: {this.setXorO()}</span>
          <span>score: X-{this.state.scoreX} and O-{this.state.scoreO}</span>
        </div>
        <div className="Board">
          { this.state.value.map((el, index) => (
            <Square  key={index} value={this.state.value[index]} click={() => this.clickIsSquare(index)} />))
          }
      
        </div>
      <button onClick={() => this.setState({value: Array(9).fill(null), 
          theXorY: this.setXorO(),
          display: true,
          playGame: true})}>-=new games=-</button>
      </div>
    );
  }

  processingOfGold() {
    const arr = this.state.value;
    const variants = ['012', '036', '048', '147', '246', '258', '345', '678', ];

    variants.forEach(el => {
      let [a, b, c] = [...el]
      if (arr[a] !== null && arr[a] === arr[b] && arr[b] === arr[c]) {  
        
        if (!this.state.theXorO) {
          this.setState({playGame: false, display: false, scoreX: this.state.scoreX + 1});
        }
        if (this.state.theXorO) {
          this.setState({playGame: false, display: false, scoreO: this.state.scoreO + 1});
        }
      }
    });
  }
}

export default App;
