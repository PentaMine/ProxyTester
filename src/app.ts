import express, {Express, Request, Response} from 'express';
import * as https from "https";
import * as fs from "fs";

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


httpsServer.listen(443, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${443}`);
});

server.listen(80, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${80}`);
});