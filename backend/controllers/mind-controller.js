const express = require('express')
const router = express.Router()

const Mind = require('../models/mind-model')

router.get('/', (req, res) => {
    res.send('Your mind is being controlled muhahaha.')
})

module.exports = router