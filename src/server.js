import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 전달 받은 소켓 출력
function handleConnection(socket) {
    console.log(socket);
}
// 연결이 되면 실행 이벤트:connection
// handleConnection 콜백함수(웹소켓, 인커밋 메세지) 실행
wss.on("connection", handleConnection);
  
server.listen(3000, handleListen);
