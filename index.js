const express = require("express");
const cors = require("cors");
const multer = require("multer");
const parser = require('simple-excel-to-json')
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        const { originalname } = file
        cb(null, "emanuel.xlsx")
    }
})
const upload = multer({storage})

const app = express()
app.use(cors())
app.use(express.static("public"));

app.post("/upload", upload.single("exel"), (req, res) => {
    const doc = parser.parseXls2Json('./uploads/emanuel.xlsx');
    fs.writeFileSync("./uploads/data.json", JSON.stringify(doc));
    res.redirect("/print.html")
})

app.get("/bfghstbfhsnggfdhbsahgsefbdahsgefhsggsvvegeg", (req, res) => {
    const data = fs.readFileSync("./uploads/data.json")
    res.send(JSON.parse(data)[0])
});

app.listen(3000, () => {
    console.log("server is running")
})