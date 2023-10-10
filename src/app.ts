import express, {Express, Request, Response} from 'express';
import * as https from "https";
import * as fs from "fs";
import {configDotenv} from "dotenv";

configDotenv()

const httpPort = Number(process.env.HTTP_PORT)
const httpsPort = Number(process.env.HTTPS_PORT)

const server: Express = express();
const httpsServer = https.createServer(
    {
        key: fs.readFileSync("key.pem"),
        cert: fs.readFileSync("cert.pem"),
    },
    server
)

server.get("/", (req: Request, res: Response) => {
    res.json({secure: req.secure, headers: req.headers})
})

server.listen(httpPort, "0.0.0.0", () => {
    console.log(`HTTP server up at http://0.0.0.0:${httpPort}`);
});

httpsServer.listen(httpsPort, "0.0.0.0", () => {
    console.log(`HTTPS server up at https://0.0.0.0:${httpsPort}`);
});
