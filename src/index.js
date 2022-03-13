import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Board from './components/Board.js';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {

			rows: 5,
			cols: 5,

		};
		this.state.squares = Array(this.state.rows * this.state.cols).fill(0);
		this.state.squares[6] = 1;
		this.state.squares[11] = 1;
		this.state.squares[12] = 1;
		this.state.squares[16] = 1;
		this.state.squares[17] = 1;
		this.state.squares[22] = 1;

	}


	render() {
		return (
			<>
				<h1>Life Game</h1>
				<h2> Click on each cell to toggle it dead or alive</h2>

				<Board
					rows={this.state.rows}
					cols={this.state.cols}
					squares={this.state.squares}
					rules="3/23"
					displayCellsInColor="true"
					displayAliveColor="green"
					displayDeadColor="white"

				/>
			</>
		)
	}

}



// ========================================


ReactDOM.render(<App />, document.getElementById('root'));

export default App;