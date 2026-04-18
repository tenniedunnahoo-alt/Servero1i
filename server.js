const express = require("express");
const crypto = require("crypto");

const app = express();

// 🔐 SECRET KEY (change kar sakta hai)
const SECRET = "ANIVERSE_SECRET_KEY";

// 🧠 TOKEN GENERATE
function generateToken(user, plan) {
  const expiry = Date.now() + 5 * 60 * 1000; // 5 min
  const data = `${user}:${plan}:${expiry}`;
  const hash = crypto.createHmac("sha256", SECRET).update(data).digest("hex");
  return Buffer.from(`${data}:${hash}`).toString("base64");
}

// 🧠 TOKEN VERIFY
function verifyToken(token) {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [user, plan, expiry, hash] = decoded.split(":");

    const data = `${user}:${plan}:${expiry}`;
    const validHash = crypto.createHmac("sha256", SECRET).update(data).digest("hex");

    if (hash !== validHash) return null;
    if (Date.now() > parseInt(expiry)) return null;

    return { user, plan };
  } catch {
    return null;
  }
}

// 🎟️ TOKEN API
app.get("/getToken", (req, res) => {
  const user = req.query.user || "guest";
  const plan = "starter";

  const token = generateToken(user, plan);

  res.json({ token, plan });
});

// 🎬 DRM API
app.get("/getVideo", (req, res) => {
  const { url, token } = req.query;

  if (!url || !token) {
    return res.json({ error: "Missing url or token" });
  }

  const data = verifyToken(token);

  if (!data) {
    return res.json({ error: "Invalid or expired token" });
  }

  // 🔐 Secure URL generate
  const secureUrl = `${url}?token=${Math.random().toString(36).substring(2)}&exp=${Date.now() + 300000}`;

  res.json({ url: secureUrl });
});

// 🌐 HOME
app.get("/", (req, res) => {
  res.send("🔥 AniVerse Backend Running");
});

// 🚀 PORT FIX (IMPORTANT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
