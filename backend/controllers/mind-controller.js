const express = require('express')
const router = express.Router()

const Mind = require('../models/mind-model')

// router.get('/', (req, res) => {
//     res.send('Your mind is being controlled muhahaha.')
// })

router.get('/', (req, res) => {
    Mind.find({})
    .then((data) => {
        // console.log(data)
        res.render('index', {data})
    })
    .catch(console.error)
})

router.get('/view/:name', (req, res) => {
    // console.log(req.params)
    let context = {viewFolder: req.params.name}
    res.render('view', context)
})

//lmf - life-minded folder
router.get('/newLMF', (req, res) => {
    res.render('new')
})

//lmsf -life-minded sub folder
//1:32
router.get('/view/:name/newLMSF', (req, res) => {
    console.log(req.params)
    res.render('newSub')
 })

router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    Mind.findById(id)
    .then((data) => {
        res.render('edit', {data})
    })
    .catch(console.error)
})

router.get('/view/edit/:id', (req, res) => {
    const id = req.params.id;
    Mind.findById(id)
    .then((data) => {
        res.render('edit', {data})
    })
    .catch(console.error)
})


router.post('/', (req, res) => {
    //need check req.body.priority. If no value, create.
    //If value provided, add in req.body(calculate alert time)
    //once day is calc, req.body will take field of remindDate
    Mind.create(req.body, 
        {
            LifeFolder: 
            {
                name: req.body.name
            }
        },
        // console.log("controller", req.query),
        // {new: true}
    )
        .then(() => {
            res.redirect('/lm')
        })
        .catch(console.error)
})

router.post('/newLMSF', (req, res) => {
    Mind.create(req.body,
        {
            
            subFolder:
            {
                name: req.body.name
            }
            
        },
        // {new: true}
    )
        .then(() => {
            res.redirect('/lm/view/:id')
        })
        .catch(console.error)
})

router.put('/edit/:id', (req, res) => {
    Mind.findByIdAndUpdate(req.params.id,
        {
            LifeFolder: 
            {
                name: req.body.name
            }
        },
        {new: true}
    )
     .then(() => {
         res.redirect('/lm')
     })   
     .catch(console.error)
})

router.put('view/edit/:id', (req, res) => {
    Mind.findByIdAndUpdate(req.params.id, 
        {
            name: req.body.name
        })
    .then(() => {
        res.redirect('/lm/view')
    })
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