const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")

const app = express();
app.use(express.json());

app.use(cors());
app.use(cookieParser())
app.use(require("./routes/users"))


mongoose.connect("mongodb://localhost:27017/loginRegisterDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) => {
        console.log(err);
    })

app.listen(8080, () => {
    console.log("Server running on port 8080");
})