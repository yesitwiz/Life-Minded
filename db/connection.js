// require('dotenv').config({path:'DEV_DB_URL/.env'})
// require('dotenv').config()
const mongoose = require('mongoose')


const mongoURI = 
    process.env.NODE_ENV === 'production'
    // ? and : ternery operator. ? if this is true, do x. : if this is false, do y
    ? process.env.DB_URL
    : process.env.DEV_DB_URL
    // console.log(process.env)

// console.log(mongoURI, 'mongo')

mongoose
    .connect(mongoURI)
    // console.log(mongoURI, 'mongoose connection')
    .then( (instance) => console.log(`Connected to: ${instance.connections[0].name}`)
    )
    .catch(error => 
        console.log(`failed conn:`, error)
    )
module.exports = mongoose