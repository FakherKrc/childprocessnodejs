const express = require("express")
const app = express()
const {fork} = require("child_process")



app.get('/isPrime', (req, res) => {
    const worker = fork("./worker.js")
    const starttime = new Date()
   worker.send({
       number: parseInt(req.query.number)
   })
    worker.on('message', message => {
        const endtime = new Date();
        res.json({
            ...message, 
            time : endtime.getTime() - starttime.getTime() + "ms",
        })

   })
})

app.get('/parallelrequest', (req, res) => {
    res.send("parralel request result")
})

app.listen(3636, () => console.log("Server Started"))