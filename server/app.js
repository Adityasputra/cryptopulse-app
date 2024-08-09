const express = require("express");
const app = express();
const router = require("./routes/index");
const cors = require("cors");
const gemini = require("./helpers/gemini");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const { User } = require("./models");
const { signToken } = require("./helpers/jwt");
const { default: axios } = require("axios");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);

app.post("/gemini", async (req, res, next) => {
  try {
    const { input, type } = req.body;
    let data;

    if (type === "price") {
      data = await gemini.getMarketPrice(input);
    } else if (type === "suggestion") {
      data = await gemini.getSuggestion(input);
    } else {
      return res.status(400).json({
        message: "Invalid type. Please specify 'price' or 'suggestion'.",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.get("/api/news/digital-currencies", async (req, res) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "Latest developments in the cryptocurrency world",
        apiKey: "5cd4ca0d0e5d4d27a4175e77c9b7ff9f",
      },
    });

    res.json(response.data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Error fetching news" });
  }
});

app.post("/google-login", async (req, res, next) => {
  const token = req.headers.google_token;
  try {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const email = payload.email;

    const [user, created] = await User.findOrCreate({
      where: { email },
      default: {
        email,
        password: "googleLogin",
      },
      hooks: false,
    });

    const access_token = signToken({ id: user.id });
    res.status(200).json({ access_token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = app;
