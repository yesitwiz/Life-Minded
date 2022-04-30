const Mind = require('../models/mind-model')
const seedData = require('./seeds.json')

Mind.deleteMany({},)
    .then(() => {
        Mind.insertMany(seedData)
    })
    .then(console.log)
    .catch(console.error)
    .finally(() => {
        process.exit()
    });

    //believe this needs to invoked via node db/ node seeds.json