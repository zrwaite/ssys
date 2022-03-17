import "./KeyValueEdit.css";

const KeyValueEdit = (props) => {
	let editDisplay = {display: "none"};
    let viewDisplay = {display: "grid"};
    if (props.editMode) {
        editDisplay.display = "grid";
        viewDisplay.display = "none";
    }
	let inputSection;
	if (props.inputType==="textarea") 
		inputSection = <textarea style={editDisplay} name={props.name} rows="5" value={props.value} onChange={props.parentHandleInputChange}/>
	else if (props.inputType==="text")                        
		inputSection = <input style={editDisplay} type={"text"} name={props.name} value={props.value} onChange={props.parentHandleInputChange}/>
	else if (props.inputType==="select") 
		inputSection = (
			<select style={editDisplay} name={props.name} value={props.value} onChange={props.parentHandleInputChange}>
				{props.options.map((option, i) => {
					return <option readOnly={true} key={i} value={option}>{option}</option>
				})}
			</select>)

    return (
		<div className={"keyValueEditRow"}>
			<h4 className={"keyValueEditKey"}>{props.displayName}:</h4>
			<div>
				<p style={viewDisplay}>{props.value}</p>
				{inputSection}
			</div>
		</div>
    )
}

export default KeyValueEdit;