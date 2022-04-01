const express = require("express");
const https = require("https");
const app = express();
const ejs = require("ejs");
const url = `https://api.adviceslip.com/advice`;

let advices = []
let adviceIds = []
let firstAdvices = []
let firstAdviceId = []


app.use(express.static("public"));
app.set("view engine", "ejs")
app.get("/", function (req, res) {
  https.get(url,function(response){
    response.on("data",function(data){
      const firstAdvice = JSON.parse(data)
      firstAdvices[0] = firstAdvice.slip.advice
      firstAdviceId[0] = firstAdvice.slip.id
    })
  })
  res.sendFile(__dirname + "index.ejs");
  res.render("index", {adviceStr: advices, firstAdvicePara: firstAdvices, adviceId: adviceIds, firstAdviceId: firstAdviceId})
  advices = []
  adviceIds = []
});

app.post("/",function(req,res){
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const advice = JSON.parse(data);
      advices[0] = advice.slip.advice
      adviceIds[0] = advice.slip.id
      res.redirect("/")
    });
  });
})

app.listen(process.env.PORT, () => console.log("Server started on port 5500"));

