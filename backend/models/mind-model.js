const mongoose = require('../db/connection')
const toJson = require('@meanie/mongoose-to-json');
const {Schema} = mongoose;
// const Schema = mongoose.Schema

const mindSchema = new Schema (
    {
        // name: String,
        LifeFolder: 
        {
            name: String,
            subFolder: 
                [{
                    sname: String
                    // todos: [String]
                }]
        
        },
        
        // subFolder: 
        // {
        //     name: String,
        //     todos: 
        //         {
        //             tasks: [String]
        //         }
        //     }
   
    },
    {timestamps: true}
)
mindSchema.plugin(toJson);
const Mind = mongoose.model('Mind', mindSchema)

module.exports = Mind;