import express, {Express, Request, Response} from 'express';
import * as https from "https";
import * as fs from "fs";
import {configDotenv} from "dotenv";

configDotenv()

const httpPort = process.env.HTTP_PORT
const httpsPort = process.env.HTTPS_PORT

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

server.listen(httpPort, () => {
    console.log(`HTTP server up at http://localhost:${httpPort}`);
});

httpsServer.listen(httpsPort, () => {
    console.log(`HTTPS server up at https://localhost:${httpsPort}`);
});
