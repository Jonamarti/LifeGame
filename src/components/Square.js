const Square = (props) => {
	
	return (
		<button className="square" onClick={props.onClick}
			style={props.style}
		>
		</button>
	);

};

export default Square;

