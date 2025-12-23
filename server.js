 // server.js
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/api/chat", (req, res) => {
  const userMessage = req.body.message || "";

  let reply = "Analizuję problem…";

  if (/hej|cześć|witaj/i.test(userMessage)) {
    reply = "Hej 👋 W czym mogę pomóc?";
  } else if (/błąd|error/i.test(userMessage)) {
    reply = "Daj kod lub logi – znajdziemy problem.";
  } else if (/plugin|minecraft/i.test(userMessage)) {
    reply = "Mogę napisać plugin lub naprawić istniejący.";
  }

  res.json({ reply });
});

app.listen(3000, () => {
  console.log("✅ Dorsz 1.0 działa: http://localhost:3000");
});

