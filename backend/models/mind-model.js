const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const mindSchema = new Schema (
    {
        LifeFolders: 
        {
            name: String,
            position: Number
        },

        subFolders:
            {
                name: String,
                position: Number
            },
        
        todos: 
            {
                tasks: String,
                priority: Number
            }
                  
    },
    
    {timestamps: true}
)

module.exports = mindSchema