function ResetButton(props) {
	return (
		<button type="submit" onClick={props.onClick}>
			Reset Cells
		</button>
	);
}

function EvolveButton(props) {
	return (
		<button type="submit" onClick={props.onClick}>
			Evolve
		</button>
	);
}

function StepButton(props) {
	return (
		<button type="submit" onClick={props.onClick}>
			Step
		</button>
	);
}



function ToggleButton(props) {
	return (
		<div>
			<div>
				<label>Non-colored option</label>
				<input type="radio" value="blackandwhite" name="colorDisplayMode"
					onChange={props.displayBlack}>
				</input>
			</div>

			<div>
				<label>Colored option</label>
				<input type="radio" value="colored" name="colorDisplayMode" checked
					onChange={props.displayColor}>


				</input>
			</div>
			<input type="color" id="alive-color-picker"
				defaultValue={"#5FF069"}
				onInput={props.changeColorAlive}

			></input>

			<input type="color" id="dead-color-picker"
				defaultValue={"#A0A0A0"}
				onInput={props.changeColorDead}
			></input>


		</div>
	);
}


export { ResetButton, EvolveButton, StepButton, ToggleButton };