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
    const squares = this.state.value.slice();
        squares[sq] = this.setXorO();
        this.setState({value: squares, theXorO: !this.state.theXorO});

        setTimeout(() => { //
          this.processingOfGold();
        }, 50);  
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
        <div className="App">
          <Square value={this.state.value[0]} click={() => this.clickIsSquare(0)} />
          <Square value={this.state.value[1]} click={() => this.clickIsSquare(1)} />
          <Square value={this.state.value[2]} click={() => this.clickIsSquare(2)} />
        </div>
        <div className="App">
          <Square value={this.state.value[3]} click={() => this.clickIsSquare(3)} />
          <Square value={this.state.value[4]} click={() => this.clickIsSquare(4)} />
          <Square value={this.state.value[5]} click={() => this.clickIsSquare(5)} />
        </div>
        <div className="App">
          <Square value={this.state.value[6]} click={() => this.clickIsSquare(6)} />
          <Square value={this.state.value[7]} click={() => this.clickIsSquare(7)} />
          <Square value={this.state.value[8]} click={() => this.clickIsSquare(8)} />
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
