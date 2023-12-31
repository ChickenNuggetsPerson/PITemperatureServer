const express = require('express')
const app = express()
const fs = require("fs")


const port = 22662
const tempPath = "/sys/class/thermal/thermal_zone0/temp"

function getTemperature() {
    let temp = JSON.parse(fs.readFileSync(tempPath, "utf-8"));
    temp = temp / 1000;
    temp = temp * 9;
    temp = temp / 5;
    temp += 32;
    return temp;
}

app.get('/', (req, res) => {
  res.json({
    "temperature": getTemperature()
  })
})

app.listen(port, () => {
  console.log(`Temperature Server Listening on Port: ${port}`)
})