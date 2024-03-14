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

// Serve static files from the 'dist/client' directory
app.use('/dist', express.static(path.join(__dirname, '../dist/client')));

// Serve the index.html file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 8001;
server.listen(port, () => {
    console.log('Server is running on port ' + port);
    console.log('Open http://localhost:' + port + ' in your browser.');
});