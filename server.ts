import express, { Application} from "express";
import apiRouter from "./API";
import { ValidateDirectory} from "./src/Helpers/imageHandler";
import { Server } from "socket.io";
import http from 'http';
import path from "path";
const cors = require("cors");
require("dotenv").config();
const port = Number(process.env.PORT) || 5000;

const app: Application = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors :{
    origin : ['*']
  }
});

app.get('/', (req, res)=>{res.send('Welcome to Kode Klubs')})

io.on('connection', (socket : any) => {
  console.log('a user connected', socket.id);
});

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", apiRouter);


server.listen(port, () => {
  ValidateDirectory();
  console.log(`Server Listening at http://localhost:${port}`);
});

export {io}