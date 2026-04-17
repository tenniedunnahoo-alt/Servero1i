const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "ANIVERSE123";

app.get("/getVideo", (req, res) => {
  const { url, key, plan, type } = req.query;

  if (key !== API_KEY) {
    return res.json({ error: "Invalid API Key" });
  }

  if (!url) {
    return res.json({ error: "No video URL" });
  }

  if (!["free", "starter", "vip"].includes(plan)) {
    return res.json({ error: "Invalid plan" });
  }

  if (plan === "free" && type !== "trailer") {
    return res.json({ error: "Upgrade to watch full video" });
  }

  const token = Math.random().toString(36).substring(2);
  const expiry = Date.now() + 5 * 60 * 1000;

  const secureUrl = `${url}?token=${token}&exp=${expiry}`;

  res.json({ url: secureUrl });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`DRM Server Running on port ${PORT}`);
});
