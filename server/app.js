const express = require("express");
const app = express();
const router = require("./routes/index");
const cors = require("cors");
const gemini = require("./helpers/gemini");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);

app.post("/gemini", async (req, res, next) => {
  try {
    const { input } = req.body;
    let data = await gemini(input);

    console.log(data, "Data <---2")
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = app;
