const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// 🔑 API KEY
const API_KEY = "ANIVERSE_SECRET_123";

// 👑 Premium check (baad me DB se connect karna)
function isPremium(user) {
  return user === "vip";
}

// 🎬 DRM API (MP4 + HLS dono ke liye)
app.get("/getVideo", (req, res) => {
  const { url, user, key } = req.query;

  // 🔐 API KEY check
  if (key !== API_KEY) {
    return res.status(401).json({ error: "Invalid API Key" });
  }

  if (!url) {
    return res.status(400).json({ error: "No video URL" });
  }

  // 👑 Premium check
  if (!isPremium(user)) {
    return res.status(403).json({ error: "Upgrade to premium" });
  }

  // 🔑 Token generate
  const token = Math.random().toString(36).substring(2);

  // ⏳ Expiry (3 min)
  const expiry = Date.now() + 3 * 60 * 1000;

  // 🔗 Secure URL
  const secureUrl = `${url}?token=${token}&exp=${expiry}`;

  res.json({ url: secureUrl });
});

// 🚀 Server start
app.listen(3000, () => {
  console.log("🔥 AniVerse DRM + HLS Server Running on Port 3000");
});