
// Module Imports
const express = require('express')
const dbConnect = require('./db')
const cors = require('cors')

// Initialisations
const app = express()
const port = 5000

// using express middleware for json and cors for connection
app.use(express.json())
app.use(cors())


// Routing
app.use("/TrackerD/auth", require("./routes/auth"))
app.use("/TrackerD/home", require("./routes/home"))

app.listen(port, async () => {
  await dbConnect()
  console.log(`TrackerD listening on http://localhost:${port}`)
})