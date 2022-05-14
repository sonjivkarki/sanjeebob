const express = require('express')
const app = express()
const fs = require("fs")
const port = 3000

app.use(express.static("public"))
app.use(express.json())

app.post("/data", (req, res)=>{
    let location = req.body.location
    let type = req.body.type
    let rawdata = fs.readFileSync('public/data/data.json');
    let js = JSON.parse(rawdata);
    console.log(req.body)
    try {
      data = js[location][type]
    } catch (error) {
      console.log("cannot find")
    }
    res.type('application/json')
    res.send(data)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})