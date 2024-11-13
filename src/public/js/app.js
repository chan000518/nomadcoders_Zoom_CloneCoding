const socket = new WebSocket(`ws://${window.location.host}`);

function handleOpen() {
    console.log("Connected to Server ✅");   
}

// 서버가 보낸 메세지를 받아서 처리
function handleMessage(message) {
    console.log("New message: ", message.data)
}

function handleClose() {
    console.log("Disconnected from Server ❌");
}

socket.addEventListener("open", handleOpen);
socket.addEventListener("message", handleMessage);
socket.addEventListener("close", handleClose);

setTimeout(() => {
    // 서버로 메세지를 보냄
    socket.send("hello from the browser!");
}, 10000);
  