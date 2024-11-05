import express from "express"

const app = express();

// view엔진 설정
app.set("view engine", "pug");
//view디렉토리 설정
app.set("views", __dirname + "/views");
// use를 통해 /public디렉토리에 있는 파일들 전달
app.use("/public", express.static(__dirname + "/public"));
// 홈으로 랜더(뷰 엔진)
app.get("/", (req, res) => res.render("home"));

// 이건 왜 따로 뺀지 몰루?
const handleListen = () => console.log(`Listening on http://localhost:3000`);

app.listen(3000, handleListen);