const mongoose = require('../db/connection')
const toJson = require('@meanie/mongoose-to-json');
const {Schema} = mongoose;

const mindSchema = new Schema (
    {
        LifeFolder: 
        {
            parent: String,
            parentName: String,
            name: String,
            category: String,
            priority: Number
      
        },
   
    },
    {timestamps: true}
)
mindSchema.plugin(toJson);
const Mind = mongoose.model('Mind', mindSchema)

module.exports = Mind;