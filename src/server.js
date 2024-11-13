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

// 연결이 끝나면 실행 (이벤트: close)
function onSocketClose() {
    console.log("Disconnected from the Browser ❌");
}

// 메세지가 오면 실행
function onSocketMessage(msg) {
    const message = JSON.parse(msg)
    console.log(message);
    console.log(String(message));
    
    // 문자열로 변환해 출력
    console.log(message.payload);
}

// 소켓들을 관리할 배열
const sockets = [];
  
// 연결이 되면 실행 (이벤트:connection)
// handleConnection 콜백함수(웹소켓, 인커밋 메세지) 실행
wss.on("connection", (socket) => {
    // 소켓
    sockets.push(socket);

    socket["nickname"] = "Anon";

    console.log("Connected to Browser ✅");
    
    socket.on("close", onSocketClose);
    // 메세지가 오면 메세지 출력
    // 서버가 받은 메세지 출력
    socket.on("message", onSocketMessage);
    
    // 연결이 되면 hello 전송
    // socket.send("hello!!!");
    
    // 소켓 여러개를 관리 소켓을 연결할때 메세지 이벤트 on("message")로 등록하여
    // 하나의 소켓에서 받은 메세지를 연결된 모든 소켓에 전달
    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        switch (message.type) {
            case "new_message":
                sockets.forEach((aSocket) =>
                    aSocket.send(`${socket.nickname}: ${message.payload}`)
            );
            case "nickname":
                socket["nickname"] = message.payload;
    }
    });
});
// ws는 소켓으로 사용자 식별 가능 : 소켓을 계속 유지하기 때문
// 소켓 자체에 정보를 넣어 보관 가능

server.listen(3000, handleListen);
