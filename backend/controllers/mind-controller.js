const express = require('express')
const router = express.Router()

const Mind = require('../models/mind-model')

// router.get('/', (req, res) => {
//     res.send('Your mind is being controlled muhahaha.')
// })

router.get('/', (req, res) => {
    Mind.find({})
    .then((data) => {
        res.render('index', {data})
    })
    .catch(console.error)
})

//lmf - life-minded folder
router.get('/newLMF', (req, res) => {
    res.render('new')
})

//lmsf -life-minded sub folder
router.get('/newLMSF', (req, res) => {
    res.render('new')
})

router.get('/:id', (req, res) => {
    Mind.findById(req.params.id)
    .then((data) => {
        res.render('index', {data})
    })
    .catch(console.error)
})

router.get('/:id/edit', (req, res) => {
    const id = req.params.id;
    Mind.findById(id)
    .then((data) => {
        res.render('edit', {data})
    })
    .catch(console.error)
})

router.post('/newLMF', (req, res) => {
    Mind.create(req.body)
        .then(() => {
            res.redirect('/lm')
        })
        .catch(console.error)
})

router.put('/:id', (req, res) => {
    Mind.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
        },
        {new: true}
    )
     .then(() => {
         res.redirect('/lm')
     })   
     .catch(console.error)
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Mind.findOneAndRemove({_id: id})
    .then(() => {
        res.redirect('/lm');
    })
    .catch(console.error)
})
module.exports = router