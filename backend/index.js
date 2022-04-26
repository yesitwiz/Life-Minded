require('dotenv').config()
const express = require('express')
const app = express()

const MindController = require('./controllers/mind-controller')

const methodOverride = require('method-override')

const bodyparser = require('body-parser')

app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use("/lm", MindController )


const port = process.env.PORT || 1116;

app.listen(port, () => {
    console.log(`Your life is about to be minded on ${port}`)
})