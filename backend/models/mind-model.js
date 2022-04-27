const mongoose = require('../db/connection')
const toJson = require('@meanie/mongoose-to-json');
const {Schema} = mongoose;
// const Schema = mongoose.Schema

const mindSchema = new Schema (
    {
        // name: String,
        LifeFolder: 
        {
            parent: String,
            name: String,
            category: String,
            // subFolder: 
            //     [{
            //         // sname: String
            //         // todos: [String]
            //     }]
        
        },
   
    },
    {timestamps: true}
)
mindSchema.plugin(toJson);
const Mind = mongoose.model('Mind', mindSchema)

module.exports = Mind;