const express = require("express")
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes')
const cors = require('cors')

dotenv.config()

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("database connected"))

app.use(express.json())
app.use(cors())
app.use('/', routesUrls)
app.listen(4000,() => console.log("server is up and running"))


// mongodb+srv://Dean:Dean@cluster0.qmrdd.mongodb.net/Users?retryWrites=true&w=majority