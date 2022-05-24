import React from "react";
import {httpReq} from "../../modules/http_requests";
import {getCookie} from "../../modules/cookies";
import upArrow from "../../images/upArrow.svg";
import downArrow from "../../images/downArrow.svg";
import "./WorkshopChoices.css"
import {workshopsData} from "../../modules/workshops";

const WorkshopChoices = (props) => {
	const rearrangeWorkshops = async (index, up) => {
		const newWorkshops = props.workshop_choices.split(" ");
		let secondIndex = index + (up ? -1 : 1);
		if (secondIndex < 0 || secondIndex >= workshopsData.length) return;
		let temp = newWorkshops[secondIndex];
		newWorkshops[secondIndex] = newWorkshops[index];
		newWorkshops[index] = temp;
		let json = await httpReq("/api/user/", "PUT", {
			username: getCookie("username"),
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
	return (
		<div className={"workshopChoicesPanel userPagePanel"}>
			<div className={"infoHeader"}>
				<h2>Workshop Choices</h2>
				<p>Your workshop choices have been made - see you at the summit!</p>
				{/* <img style={viewDisplay} src={editIcon} onClick={() => setState({...state, editMode: true})}
                     alt={"edit icon"}/>
                <img style={editDisplay} src={closeIcon} onClick={() => setState({...state, editMode: false})}
                     alt={"close icon"}/> */}
			</div>
			{/* {props.workshop_choices.split(" ").map((id, i) => {
				const workshop = workshopsData.find(item => item.code === id);
				return !workshop ? null :
				<div className={"workshopChoice"} key={i}>
					<div className={"workshopChoiceInfo"}>
						<h2>{workshop.name}</h2>
						<details>
							<summary>About {workshop.title}</summary>
							<p>{workshop.description}</p>
						</details>
						<img className={"workshopImage"} src={workshop.imageSrc} alt="workshop"/>
					</div>
					<div className={"workshopSelector"}>
						<div className={"workshopSelectorUp"} onClick={() => rearrangeWorkshops(i, true)}>
							<img src={upArrow} alt={"Up"}/>
						</div>
						<div className={"workshopSelectorDown"} onClick={() => rearrangeWorkshops(i, false)}>
							<img src={downArrow} alt={"Down"}/>
						</div>
					</div>
				</div>
			})} */}
		</div>
	)
}

export default WorkshopChoices;