const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/images", express.static("images"));

app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await axios.post(
      "http://127.0.0.1:7860/sdapi/v1/txt2img",
      {
        prompt: prompt,
        steps: 25,
        width: 512,
        height: 512
      }
    );

    const base64 = response.data.images[0];
    const buffer = Buffer.from(base64, "base64");

    const fileName = `img_${Date.now()}.png`;
    fs.writeFileSync(`images/${fileName}`, buffer);

    res.json({ url: `/images/${fileName}` });
  } catch (err) {
    res.status(500).json({ error: "Błąd generowania obrazu" });
  }
});

app.listen(3000, () =>
  console.log("✅ Dorsz backend działa: http://localhost:3000")
);
