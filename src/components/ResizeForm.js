import React from "react";
// import './App.css';


const ResizeForm = (props) => {

	return (
		<>
		
		<form onSubmit={props.onSubmit}>
			<div>
			<label> Rows </label>
			<input type="number" name="resize_form_rows" placeholder={props.placeholder_rows}
				min="0" max="100">

			</input>
			</div>
			<div>
			<label> Columns </label>
			<input type="number" name="resize_form_cols" placeholder={props.placeholder_cols}
				min="0" max="100">

			</input>
			</div>

			<button type="submit">
				Resize board
			</button>

		</form>
		</>
	);
};

export default ResizeForm;