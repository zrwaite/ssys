import React, {useState} from "react";
import {httpReq} from "../../modules/http_requests";
import {getCookie} from "../../modules/cookies";

import "./WorkshopChoices.css"

const WorkshopChoices = (props) => {
	const [dataPulled, setDataPulled] = useState(false);
	const [workshops, setWorkshops] = useState([]);
	const getWorkshops = async () => {
        let json = await httpReq("/api/workshop/", "GET")
        let response = JSON.parse(json);
		console.log(response);
        if (response.success && response.objects) {
            setWorkshops(response.objects);
        } else if (response.errors.length > 0) {
            alert(response.errors);
        }
    }
	const rearrangeWorkshops = async (index, up) => {
		const newWorkshops = props.workshop_choices.split(" ");
		let secondIndex = index+(up?-1:1);
		if (secondIndex<0 || secondIndex >= workshops.length) return;
		let temp = newWorkshops[secondIndex];
		newWorkshops[secondIndex] = newWorkshops[index];
		newWorkshops[index] = temp;
		let json = await httpReq("/api/user/", "PUT", {
			email: getCookie("email"),
			workshop_choices: newWorkshops.join(" ")
		})
		let response = JSON.parse(json);
		if (response.success && response.objects) {
			console.log(response);
			props.parentChangeWorkshopChoices(newWorkshops.join(" "));
		} else if (response.errors.length > 0) {
			alert(JSON.stringify(response));
		}
	}
    if (!dataPulled) {
		setDataPulled(true);
		getWorkshops();
	}
	return (
        <div className={"workshopChoicesPanel userPagePanel"}>
			<div className={"infoHeader"}>
                <h2>Workshop Choices</h2>
                {/* <img style={viewDisplay} src={editIcon} onClick={() => setState({...state, editMode: true})}
                     alt={"edit icon"}/>
                <img style={editDisplay} src={closeIcon} onClick={() => setState({...state, editMode: false})}
                     alt={"close icon"}/> */}
            </div>
			{props.workshop_choices.split(" ").map((id, i) => {
				const workshop = workshops.find(item => item.code === id);
				return !workshop?null:
				<div className={"workshopChoice"} key={i}>
					<div className={"workshopChoiceInfo"}>
						<h2>{workshop.name}</h2>
						<p>{workshop.description}</p>
						<img className={"workshopImage"} src={workshop.image_link} alt="workshop"/>
					</div>
					<div className={"workshopSelector"}>
						<div className={"workshopSelectorUp"} onClick={() => rearrangeWorkshops(i, true)}></div>
						<div className={"workshopSelectorDown"} onClick={() => rearrangeWorkshops(i, false)}></div>
					</div>
				</div>
			})}
		</div>
	)
}

export default WorkshopChoices;