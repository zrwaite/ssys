import {Request, Response} from "express";
import path from "path";
import fs from "fs";

const folderPath = path.join(__dirname, "../../../client/build");
// const folderPath = path.join(__dirname, "../../../client/smart-waterloo-web/public");

const getFrontend = (req: Request, res: Response) => {
    if (req.url !== "/" && fs.existsSync(folderPath + req.url)) {
        res.status(200).sendFile(req.url, {root: folderPath});
    } else {
        res.status(200).sendFile("index.html", {root: folderPath});
    }
    //  else {
    // 	res.status(404).json("404 File not found");
    // }
};
export default getFrontend;