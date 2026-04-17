const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// ROOT (optional)
app.get("/", (req, res) => {
  res.send("DRM Server Running 🚀");
});

// 🔥 MAIN API
app.get("/getVideo", (req, res) => {
  const { url, key } = req.query;

  if (key !== "ANIVERSE_SECRET_123") {
    return res.status(401).json({ error: "Invalid API Key" });
  }

  if (!url) {
    return res.json({ error: "No video URL" });
  }

  const token = Math.random().toString(36).substring(2);
  const secureUrl = url + "?token=" + token;

  res.json({ url: secureUrl });
});

app.listen(3000, () => {
  console.log("Server running");
});
