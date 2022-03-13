import React from "react";
import ResizeForm from "./ResizeForm";
import Square from "./Square";

import { ResetButton, EvolveButton, StepButton, ToggleButton } from "./Buttons.js";



class Board extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			rows: this.props.rows,
			cols: this.props.cols,
			squares: this.props.squares,
			displayBlack: false,
			displayDeadColor: "darkgrey",
			displayAliveColor: "green",

			m: []

		};

		// This creates a 2D matrix named m from props
		for (let row = 0; row < this.state.rows; row++) {
			this.state.m[row] = new Array(this.props.col).fill(0);
			for (let col = 0; col < this.state.cols; col++) {

				this.state.m[row][col] = this.props.squares[row * this.props.cols + col];
			}
		}
		this.render();

		console.log(this.props.squares)



	}

	copyMat() {


		var ma = [];
		for (let row = 0; row < this.state.rows; row++) {
			ma[row] = [];
			for (let col = 0; col < this.state.cols; col++) {
				ma[row][col] = this.state.squares[row * this.state.cols + col];

			}
		}


		this.setState({ m: ma });

	}

	renderSquare(i, aliveCol, deadCol) {

		return (
			<>
				<Square value={this.state.squares[i]}
					style={this.state.squares[i] === 1 ? { "backgroundColor": aliveCol } : { "backgroundColor": deadCol }}

					onClick={() => {

						this.handleClick(i)
					}} />
			</>
		);
	}

	renderEvolveButton() {
		return (<EvolveButton
			onClick={() => this.evolve()} />
		)
	}
	renderStepButton() {
		return (<StepButton onClick={() => this.evolve()} />)
	}

	renderResetButton() {
		return (
			<ResetButton
				onClick={() => this.resetCells()}
			/>
		);
	}

	renderResizeForm() {
		return (
			<ResizeForm
				placeholder_rows={this.props.rows}
				placeholder_cols={this.props.cols}
				onSubmit={(event) => {
					event.preventDefault();
					this.handleResizeSubmit(event.target.resize_form_rows.value,
						event.target.resize_form_cols.value);
				}
					// event.target.{name} to access the html element
				}
			/>
		);
	}

	renderToggleButton() {
		return (
			<ToggleButton


				displayBlack={(event) => {
					
					this.setState({
						displayBlack: true,
						displayAliveColor: "#000000",
						displayDeadColor: "#ffffff"
					});
					document.getElementById("alive-color-picker").style.display = "none";
					document.getElementById("dead-color-picker").style.display = "none";


				}}

				displayColor={(event) => {
				

					document.getElementById("alive-color-picker").style.display = "inline-block";
					document.getElementById("dead-color-picker").style.display = "inline-block";
					this.setState({
						displayBlack: false,
						displayAliveColor: document.getElementById("alive-color-picker").value,
						displayDeadColor: document.getElementById("dead-color-picker").value
					})

				}}


				changeColorAlive={(event) => {

					this.setState({
						displayAliveColor: event.target.value
					})
				}}

				changeColorDead={(event) => {

					this.setState({
						displayDeadColor: event.target.value
					})
				}}

			/>
		);
	}

	handleClick(i) {
		//Changes this.state.squares[i] (1D) from 1 to 0 or viceversa.
		// Then it calls copyMat to reflect the change in this.state.m (2D)

		const squares = this.state.squares.slice();

		//Change it in squares first
		if (squares[i] === 1) {
			squares[i] = 0;
		}
		else if (squares[i] === 0) {
			squares[i] = 1;
		}

		// Change it in m too

		this.setState({ squares: squares }, () => this.copyMat());
		this.copyMat();

	}


	handleResizeSubmit(ro, co) {

		this.setState({
			rows: ro,
			cols: co,
			squares: new Array(ro * co).fill(1)
		}, () => this.copyMat());

	}


	render() {

		return (

			<div id="app_board">

				<div id="table">
					<table className="board">
						<tbody>

							{this.state.m.map((row, row_index) => (<tr className="board-row" key={row_index}>

								{row.map((cell, cell_index) => (

									<td key={row_index * this.state.cols + cell_index}>

										{this.renderSquare(row_index * this.state.cols + cell_index, this.state.displayAliveColor, this.state.displayDeadColor)}
									</td>

								)
								)}

							</tr>)

							)}

						</tbody>
					</table>

				</div>

				<hr></hr>
				<div className="buttonsWrap">
					<div className="resizeButtons">


						<div id="resize_form">
							{this.renderResizeForm()}
						</div>
					</div>

					<div className="playButtons">
						<div id="step_button">
							{this.renderStepButton()}
						</div>
						<div id="evolve_button">
							{this.renderEvolveButton()}
						</div>


						{/* TODO: stop buttons etc */}

					</div>

					<div className="optionsButtons">
						<div id="options">
							{this.renderToggleButton()}
						</div>
						<div id="button_div">
							{this.renderResetButton()}
						</div>
					</div>
				</div>
			</div>

		);
	}

	resetCells() {
		this.setState({ squares: this.state.squares.fill(0) });
		this.copyMat();
	}

	evolve() {

		const rul = this.props.rules;

		const beBornRule = rul.substr(0, rul.indexOf("/")).split("");
		const keepAliveRule = rul.substr(rul.indexOf("/") + 1).split("");


		const row = this.state.rows;
		const col = this.state.cols;


		const mat = this.state.m.slice();
		//console.log(JSON.parse(JSON.stringify(mat)));

		const numberaliveneighboursmat = Array.from(mat);
		//console.log(JSON.parse(JSON.stringify(numberaliveneighboursmat)));


		for (let r = 0; r < row; r++) {
			//console.log(JSON.parse(JSON.stringify(mat)));
			numberaliveneighboursmat[r] = new Array(numberaliveneighboursmat[r].length); // Dont change original matrix, just new
			//console.log(JSON.parse(JSON.stringify(mat)));
			//if(r===0){
			for (let c = 0; c < col; c++) {
				//console.log(this.countAliveNeighbours(r,c));
				numberaliveneighboursmat[r][c] = this.countAliveNeighbours(r, c);
			}
			//}
		}
		//console.log(numberaliveneighboursmat)


		//alivematrix[1][1]=this.countAliveNeighbours(1,1);
		/*
		console.dir("numberaliveneighboursmat")
		console.log(JSON.parse(JSON.stringify(numberaliveneighboursmat)));
		*/

		const newmat = Array.from(mat);

		for (let r = 0; r < row; r++) {

			newmat[r] = new Array(mat[r].length); // Dont change original matrix, just new

			for (let c = 0; c < col; c++) {

				//console.log(`numberaliveneighboursmat[${r}][${c}]: ${numberaliveneighboursmat[r][c]}`);
				//console.log(`keepaliveRule: ${keepAliveRule}`)
				//console.log(keepAliveRule.some((e)=>e==numberaliveneighboursmat[r][c] ));
				//console.log("keepAliveRule.some((e) => e === Number(numberaliveneighboursmat[r][c]))");
				//console.log(Number(numberaliveneighboursmat[r][c]));
				// console.log("r: "+r+ " c:" +c)
				// console.log("aliveneighs:" +Number(numberaliveneighboursmat[r][c]));
				// console.log(mat[r][c]);

				//console.log(keepAliveRule.some((e) => e === Number(numberaliveneighboursmat[r][c])));

				if (keepAliveRule.some((e) => Number(e) === Number(numberaliveneighboursmat[r][c])) && mat[r][c] === 1) {
					// was alive and will stay alive
					newmat[r][c] = 1;
				}
				else if (beBornRule.some(e => Number(e) === Number(numberaliveneighboursmat[r][c])) && mat[r][c] === 0) {
					// was dead and will be born
					newmat[r][c] = 1;
				}
				else { // overpopulation, underpopulation, etc
					newmat[r][c] = 0;
				}

			}

		}
		// console.log("newmat");
		// console.log(newmat);


		var squ = new Array(row * col);
		for (let i = 0; i < row; i++) {
			for (let j = 0; j < col; j++) {
				squ[i * row + j] = newmat[i][j];
			}
		}

		this.setState({ squares: squ, m: newmat });

	}

	countAliveNeighbours(ro, co) {
		//console.dir(`Now checking ${ro} and ${co}`);
		var aliveNeighbours = 0;
		const mat = this.state.m.slice();
		//console.log(JSON.parse(JSON.stringify(mat)));
		let rows = this.state.rows;
		let cols = this.state.cols;
		//console.log("this.getDownNeigh");
		//console.log(this.getDownNeighbour(ro,co,rows,mat));
		aliveNeighbours += this.getDownNeighbour(ro, co, rows, mat);
		aliveNeighbours += this.getDownRightNeighbour(ro, co, rows, cols, mat);
		aliveNeighbours += this.getRightNeighbour(ro, co, cols, mat);
		aliveNeighbours += this.getTopRightNeighbour(ro, co, rows, cols, mat);
		aliveNeighbours += this.getTopNeighbour(ro, co, rows, mat);
		aliveNeighbours += this.getTopLeftNeighbour(ro, co, rows, cols, mat);
		aliveNeighbours += this.getLeftNeighbour(ro, co, cols, mat);
		aliveNeighbours += this.getDownLeftNeighbour(ro, co, rows, cols, mat);


		//console.dir(`${ro} and ${co} have ${aliveNeighbours} alive neighbours`);
		return aliveNeighbours;
	}

	getDownNeighbour(ro, co, rows, m) {
		//check if last row, else simple as
		if (ro === rows - 1) {
			//console.log(`ro: ${ro} , co: ${co} , rows: ${rows}`)
			if (m[0][co] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		} else {
			if (m[ro + 1][co] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		}
	}

	getDownRightNeighbour(ro, co, rows, cols, m) {
		//check if last row, last col, both ,  else simple as
		if (ro === rows - 1 && co === cols - 1) { // bottom right, wrap right down
			//console.log(`ro: ${ro} , co: ${co} , rows: ${rows}`)
			if (m[0][0] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		} else if (ro === rows - 1 && co !== cols - 1) { // last row, wrap down
			if (m[0][co + 1] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		}
		else if (ro !== rows - 1 && co === cols - 1) { // last col, wrap right
			if (m[ro + 1][0] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		} else { // not last row, last col, neither.
			if (m[ro + 1][co + 1] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		}
	}

	getRightNeighbour(ro, co, cols, m) {
		//check if last col, else simple as
		if (co === cols - 1) {
			//console.log(`ro: ${ro} , co: ${co} , rows: ${rows}`)
			if (m[ro][0] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		} else {
			if (m[ro][co + 1] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		}
	}

	getTopRightNeighbour(ro, co, rows, cols, m) {
		//check if first row, last col, both , else simple as
		if (ro === 0 && co === cols - 1) { // top right, wrap right up
			//console.log(`ro: ${ro} , co: ${co} , rows: ${rows}`)
			if (m[rows - 1][0] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		} else if (ro === 0 && co !== cols - 1) { // first row, wrap up
			if (m[rows - 1][co + 1] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		}
		else if (ro !== 0 && co === cols - 1) { // last col, wrap right
			if (m[ro - 1][0] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		}
		else { // not first row, last col, neither
			if (m[ro - 1][co + 1] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		}
	}

	getTopNeighbour(ro, co, rows, m) {
		//check if first row, else simple as
		if (ro === 0) {
			//console.log(`ro: ${ro} , co: ${co} , rows: ${rows}`)
			if (m[rows - 1][co] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		} else {
			if (m[ro - 1][co] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		}
	}

	getTopLeftNeighbour(ro, co, rows, cols, m) {
		//check if first row, first col, both , else simple as
		if (ro === 0 && co === 0) { // top left, wrap left up
			//console.log(`ro: ${ro} , co: ${co} , rows: ${rows}`)
			if (m[rows - 1][cols - 1] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		} else if (ro === 0 && co !== 0) { // first row, wrap up
			if (m[rows - 1][co - 1] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		}
		else if (ro !== 0 && co === 0) { // first col, wrap left
			if (m[ro - 1][cols - 1] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		}
		else {	// not first row, first col, neither.
			if (m[ro - 1][co - 1] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		}
	}

	getLeftNeighbour(ro, co, cols, m) {
		//check if first col, else simple as
		if (co === 0) {
			//console.log(`ro: ${ro} , co: ${co} , rows: ${rows}`)
			if (m[ro][cols - 1] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		} else {
			if (m[ro][co - 1] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		}
	}

	getDownLeftNeighbour(ro, co, rows, cols, m) {
		//check if last row, first col, both , else simple as
		if (ro === rows - 1 && co === 0) { // bottom left, wrap left down
			//console.log(`ro: ${ro} , co: ${co} , rows: ${rows}`)
			if (m[0][cols - 1] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		} else if (ro === rows - 1 && co !== 0) { // last row, wrap down
			if (m[0][co - 1] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		}
		else if (ro !== rows - 1 && co === 0) { // first col, wrap left
			if (m[ro + 1][cols - 1] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		}
		else { // not last row, first col, neither
			if (m[ro + 1][co - 1] === 1) {
				return 1;
			}
			else {
				return 0;
			}
		}
	}

}

export default Board;