import express from "express";
import cors from "cors";
import env from "dotenv";
import rateLimit from "express-rate-limit";
// import {Request, Response} from "express"; //Typescript types

const frontendLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false
});

const app = express();

//configs
env.config();

// utilities
app.use(cors());
app.use(express.json());
// app.use((req, res, next)=>{console.log("request"); next();});

// routes
import getFrontend from "./routes/frontend.route";

app.use("/", frontendLimiter);
app.get("/", getFrontend);
app.use("/*", frontendLimiter);
app.get("/*", getFrontend);

export default app; //Export server for use in index.ts
