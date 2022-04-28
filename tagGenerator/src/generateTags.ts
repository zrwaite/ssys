import path from "path";
import canvasClass from "canvas";
import {createCanvas, Image} from "canvas";
import fs from "fs";
import {exampleData, User } from "./exampleData";
import generateQRCode from "./generateQRCode";

// const createSlice = (width: number, height: number, ctx: any, start: number, end: number, colour: string) => {
// 	end = start+end;
// 	start = (start/100)*2*Math.PI-Math.PI/2;
// 	end = (end/100)*2*Math.PI-Math.PI/2;
// 	let median = (start+end)/2
// 	let middle = {
// 		x: width/2, y: height/2
// 	}
// 	let radius = Math.min(width, height)*0.43;
// 	let offset = 0; //radius*0.04;
// 	let ox = Math.cos(median)*offset;
// 	let oy = Math.sin(median)*offset;
// 	ctx.fillStyle = colour;

//     ctx.strokeStyle = "white";
// 	ctx.beginPath();
// 	ctx.moveTo(middle.x + ox, middle.y + oy);
// 	ctx.arc(middle.x+ox, middle.y+oy, radius, start+offset*0.0001, end-offset*0.0001);
// 	ctx.lineTo(middle.x+ox, middle.y+oy);
// 	ctx.lineWidth = 5; //offset*0.3;
// 	ctx.stroke();
// 	ctx.fill();
// }

// const getLanguages = async () => {
// 	const folderPath = path.join(__dirname, "../json/");
// 	let fileName = "languages.json";
// 	let filePath = folderPath+fileName;
// 	let languageData = JSON.parse(fs.readFileSync(filePath).toString());
// 	return languageData.languages;
// }

// const createPiGraph = async (ctx: any, languages: any[], width:number, height:number) => {
// 	let totalAngle = 0;
// 	languages.forEach((language) => {
// 		if (language.percent >= 0.2) {
// 			createSlice(width, height, ctx, totalAngle, language.percent, language.colour);
// 			totalAngle += language.percent;
// 		}
// 	})
// }

// const createLegend = async (ctx: any, languages: any[], start: number, width:number, height:number) => {
// 	// ctx.fillStyle = "lightgrey";
// 	// ctx.fillRect(start+ width/20, height/40, width-width/10, height-height/8);
// 	ctx.textBaseline = "top";
// 	ctx.textAlign = 'center';

// 	ctx.font = 'bold 45pt Menlo';
// 	ctx.fillStyle = "white";
// 	ctx.fillText("Top Languages", start+width/2, height/30);
// 	ctx.fillText("(By time spent)", start+width/2, 2*height/20);
// 	ctx.font = 'bold 18pt Menlo';
// 	ctx.fillText("Since October 2021*", start+width/2, 3.5*height/20);

// 	ctx.font = 'bold 30pt Menlo';
// 	ctx.fillStyle = "black";
// 	ctx.textAlign = 'left';
// 	for (let i=0; i<languages.length; i++) {
// 		let language = languages[i];
// 		ctx.fillStyle = language.colour;
// 		ctx.fillRect(start+width/11, (i+4.5)*height/20, height/20, height/35);

// 		ctx.shadowBlur=0;
// 		ctx.fillStyle=language.colour;
// 		ctx.fillText(language.name, start+2*width/10, (i+4.2)*height/20);
		
// 		ctx.shadowBlur=0;

// 		ctx.fillStyle = language.colour;
// 		ctx.fillText(language.percent.toString() + "%", start+7*width/10, (i+4.2)*height/20);
// 	}
// 	ctx.font = 'bold 24pt Menlo';
// 	ctx.fillStyle = "white";
// 	ctx.textAlign = 'center';
// 	let date = new Date().toLocaleDateString().toString();
// 	ctx.fillText("Charts coded by Zac in nodejs", start+width/2, 17.6*height/20);
// 	ctx.fillText("Updated on: "+date, start+width/2, 18.6*height/20);
// }

// const createBackground = (ctx: canvasClass.CanvasRenderingContext2D, width: number, height:number, borderRadius: number, borderWidth: number) => {
// 	ctx.fillStyle = "black";
//     ctx.lineWidth = borderWidth;
//     ctx.strokeStyle = "white";
// 	// ctx.arc(400, 400, 100, 0, 2 * Math.PI, false);
// 	ctx.ellipse(borderRadius+borderWidth/2, borderRadius+borderWidth/2, borderRadius, borderRadius, 0, 0, 2 * Math.PI);
//     ctx.stroke();
//     ctx.restore();
// 	ctx.ellipse(width-borderRadius-borderWidth/2, borderRadius+borderWidth/2, borderRadius, borderRadius, 0, 0, 2 * Math.PI);
//     ctx.stroke();
//     ctx.restore();
// 	ctx.ellipse(borderRadius+borderWidth/2, height-borderRadius-borderWidth/2, borderRadius, borderRadius, 0, 0, 2 * Math.PI);
//     ctx.stroke();
//     ctx.restore();
// 	ctx.ellipse(width-borderRadius-borderWidth/2, height-borderRadius-borderWidth/2, borderRadius, borderRadius, 0, 0, 2 * Math.PI);
//     ctx.stroke();
//     ctx.restore();
// 	ctx.fill();

// 	ctx.fillRect(borderRadius, borderWidth/2, width-2*borderRadius, height-2*borderWidth/2);
// 	ctx.fillRect(borderWidth/2, borderRadius, width-2*borderWidth/2, height-2*borderRadius);
// 	ctx.beginPath();
// 	ctx.moveTo(0, borderRadius);
// 	ctx.lineTo(0, height-borderRadius);
// 	ctx.stroke(); 
// 	ctx.beginPath();
// 	ctx.moveTo(width, borderRadius);
// 	ctx.lineTo(width, height-borderRadius);
// 	ctx.stroke(); 
// 	ctx.beginPath();
// 	ctx.moveTo(borderRadius, 0);
// 	ctx.lineTo(width-borderRadius, 0);
// 	ctx.stroke(); 
// 	ctx.beginPath();
// 	ctx.moveTo(borderRadius, height);
// 	ctx.lineTo(width-borderRadius, height);
// 	ctx.stroke(); 
// 	// ctx.fillStyle = "black";
// 	// ctx.fill();
//     // ctx.lineWidth = 0;
//     // ctx.strokeStyle = "white";
//     // ctx.stroke();
// }

// const createImage = async () => {
// 	let width = 1500;
// 	let height = 917;
// 	let borderRadius = 20;
// 	let borderWidth = 6;
// 	let canvas = createCanvas(width, height);
// 	let ctx = canvas.getContext('2d');
// 	let languages = await getLanguages();
// 	createBackground(ctx, width, height, borderRadius, borderWidth);
// 	createPiGraph(ctx, languages, width*0.64, height)
// 	createLegend(ctx, languages, width*0.6, width*0.4, height)
	
// 	const imageFolderPath = path.join(__dirname, "../images/");
// 	let buffer = canvas.toBuffer("image/png");
// 	let imageFileName = "pigraph.png";
// 	let imageFilePath = imageFolderPath+imageFileName;
// 	fs.writeFileSync(imageFilePath, buffer);
// }

const writeImage = (data:canvasData) => {
	const imageFolderPath = path.join(__dirname, "../tags/");
	const imageFileName = `user${data.user.id}_tag.png`;
	const imageFilePath = imageFolderPath + imageFileName;
	let buffer = data.canvas.toBuffer("image/png");
	fs.writeFileSync(imageFilePath, buffer);
}

const addTagText = async (data:canvasData) => {
	data.ctx.fillStyle = "black";
	data.ctx.textAlign = 'left';
	data.ctx.font = 'bold 30pt Menlo';
	data.ctx.fillText(`${data.user.fname} ${data.user.lname}`, 160, 50, 330);
	data.ctx.font = 'bold 23pt Menlo';
	data.ctx.fillText(`School: `, 160, 100, 330);
	data.ctx.fillText(data.user.school, 160, 135, 330);
	data.ctx.fillText(`Teacher:`, 160, 200, 330);
	data.ctx.fillText(data.user.teacher?data.user.teacher:'None', 160, 235, 330);
	writeImage(data);
}

const addLogoImage = async (data:canvasData) => {
	const img = new Image();
	img.onload = () => {
		data.ctx.drawImage(img, 0, 150, 150, 150);
		addTagText(data);
	}
	img.onerror = err => { throw err }
	img.src = path.join(__dirname, "../soLogo.png");
}

const addQRImage = async (data: canvasData, filename: string) => {
	const img = new Image();
	img.onload = () => {
		data.ctx.drawImage(img, 0, 0, 150, 150);
		addLogoImage(data);
	}
	img.onerror = err => { throw err }
	img.src = path.join(__dirname, "../"+filename);
}

const generateTag = async (user: User) => {
	let width = 500;
	let height = 300;
	let canvas = createCanvas(width, height);
	let ctx = canvas.getContext('2d');
	ctx.fillStyle="white";
	ctx.fillRect(0,0,width, height);

	const tagCanvasData: canvasData = {
		user: user,
		canvas: canvas,
		ctx: ctx
	}
	generateQRCode(tagCanvasData, addQRImage);

	/*
	generateQRImage -->
	addQRImage -->
	addLogoImage -->
	addText -->
	writeImage -->
	*/


	// fs.readFile('images/squid.png', (err, squid) => {
	// 	if (err) throw err
	// 	const img = new Image()
	// 	img.onload = () => ctx.drawImage(img, 0, 0)
	// 	img.onerror = err => { throw err }
	// 	img.src = squid
	// })
	  
	  // From a local file path:

	  /*
	const img = new Image()
	img.onload = () => {
		ctx.drawImage(img, 0, 0, 100, 100);
		writeImage(data);
	}
	img.onerror = err => { throw err }
	img.src = path.join(__dirname, "../foo.png");
	*/
}

const generateTags = async () => {
	exampleData.forEach((user) => generateTag(user))
}

interface canvasData {
	user: User,
	canvas: canvasClass.Canvas,
	ctx: canvasClass.CanvasRenderingContext2D
}

export { generateTags}
export type {canvasData}