const express = require('express')
const dotenv = require('dotenv')
const app = express()

dotenv.config()
const port = process.env.PORT;
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/', require('./routes/index.js'))

app.listen(port, ()=> {
    console.log(`server running in port ${port}`);
})