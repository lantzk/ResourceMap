import http from "http";
import { Server } from "socket.io";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);

app.use(express.json());
app.use(cookieParser());

app.get('/client/:file', (req, res) => {
    const filepath = path.join(__dirname, '../client', req.params.file);
    res.sendFile(filepath);
});

app.get('/dist/:file', (req, res) => {
    const filepath = path.join(__dirname, '../dist', req.params.file);
    res.sendFile(filepath);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const port = process.env.PORT || 8001;
server.listen(port, () => {
    console.log('Server is running on port ' + port);
    console.log('Open http://localhost:' + port + ' in your browser.');
});