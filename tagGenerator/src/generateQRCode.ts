import QRCode from "qrcode";
import { canvasData } from "./generateTags";

const linkPrefix = "localhost:3000/ssys/viewuser/"

const generateQRCode = async (data: canvasData, callback: (data:canvasData, filename: string) => {}) => {
	const link = linkPrefix + data.user.id;
	const filename = `user${data.user.id}.png`;
	QRCode.toFile(
		filename,
		[{ data: link, mode: 'byte' }],
		{ errorCorrectionLevel: 'M' },
		() => {callback(data, filename)}
	  )
}


export default generateQRCode;