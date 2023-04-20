require("dotenv").config()
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")

const app = express();
app.use(express.json());

app.use(cors());
app.use(cookieParser())
app.use(require("./routes/users"))

const PORT = process.env.PORT || 8080;


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) => {
        console.log(err);
    })

app.listen(PORT, () => {
    console.log("Server running on port 8080");
})