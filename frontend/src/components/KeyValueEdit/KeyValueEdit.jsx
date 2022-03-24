import { useContext } from "react";
import { MobileContext } from "../../App";
import "./KeyValueEdit.css";

const KeyValueEdit = (props) => {
	const {mobile} = useContext(MobileContext);
	let editDisplay = {display: "none"};
    let viewDisplay = {display: "grid"};
    if (props.editMode) {
        editDisplay.display = "grid";
        viewDisplay.display = "none";
    }
	let inputSection;
	if (props.inputType==="textarea") 
		inputSection = <textarea style={editDisplay} name={props.name} rows="5" onChange={props.parentHandleInputChange} value={props.value} />
	else if (props.inputType==="text")                        
		inputSection = <input style={editDisplay} type={"text"} name={props.name} onChange={props.parentHandleInputChange} value={props.value}/>
	else if (props.inputType==="select") 
		inputSection = (
			<select style={editDisplay} name={props.name} onChange={props.parentHandleInputChange} value={props.value} >
				{props.options.map((option, i) => {
					return <option readOnly={true} key={i} value={option}>{option}</option>
				})}
			</select>)

    return (
		<div className={mobile?"keyValueEditRowMobile":"keyValueEditRow"}>
			<h4 className={mobile?"keyValueEditKeyMobile":"keyValueEditKey"}>{props.displayName}:</h4>
			<div>
				<p style={viewDisplay}>{props.value}</p>
				{inputSection}
			</div>
		</div>
    )
}

export default KeyValueEdit;