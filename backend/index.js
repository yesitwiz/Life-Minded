require('dotenv').config()
const express = require('express')
const app = express()

const MindController = require('./controllers/mind-controller')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'hbs')
app.use("/lm", MindController )


const port = process.env.PORT || 1116;

app.listen(port, () => {
    console.log(`Your life is about to be minded on ${port}`)
})