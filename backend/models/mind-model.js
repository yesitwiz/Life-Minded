const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const mindSchema = new Schema (
    {
        Folder: String,
    },
    {timestamps: true}
)

module.exports = mindSchema