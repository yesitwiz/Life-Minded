// require('dotenv').config()
const mongoose = require('mongoose')


const mongoURI = 
    process.env.NODE_ENV === 'production'
    // ? and : ternery operator. ? if this is true, do x. : if this is false, do y
    ? process.env.DB_URL
    : process.env.DEV_DB_URL


mongoose
    .connect(mongoURI)
    .then( (instance) => console.log(`Connected to: ${instance.connections[0].name}`)
    )
    .catch(error => 
        console.log(`failed conn:`, error)
    )
module.exports = mongoose