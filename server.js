const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "ANIVERSE_SECRET_123";

// 🔥 DRM API
app.get("/getVideo", (req, res) => {
  const { url, key } = req.query;

  // API KEY CHECK
  if (key !== API_KEY) {
    return res.status(401).json({ error: "Invalid API Key" });
  }

  // TOKEN
  const token = Math.random().toString(36).substring(2);

  // EXPIRY (2 min)
  const expiry = Date.now() + 2 * 60 * 1000;

  // SECURE LINK
  const secureUrl = `${url}?token=${token}&exp=${expiry}`;

  res.json({ url: secureUrl });
});

// SERVER START
app.listen(3000, () => {
  console.log("🔥 DRM Server Running on 3000");
});
