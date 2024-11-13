const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("form");

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

// setTimeout(() => {
//     // 서버로 메세지를 보냄
//     socket.send("hello from the browser!");
// }, 10000);

// 제출한 값을 소켓으로 전달
function handleSubmit(event) {
    // 폼이 제출되는 기본 동작(즉, 페이지 새로고침)을 막음
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
}

// 버튼을 누르면 실행
messageForm.addEventListener("submit", handleSubmit);