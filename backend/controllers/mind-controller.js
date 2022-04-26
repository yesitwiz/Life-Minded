const express = require('express')
const router = express.Router()

const Mind = require('../models/mind-model')

// router.get('/', (req, res) => {
//     res.send('Your mind is being controlled muhahaha.')
// })

router.get('/i', (req, res) => {
    Mind.find({})
    .then((data) => {
        // console.log(data)
        res.render('index', {data})
    })
    .catch(console.error)
})

router.get('/i/view/:name/:id', (req, res) => {
    let context = {sname: req.params.name, id: req.params.id}
    res.render('view', context)
})

// lmf - life-minded folder
router.get('/i/newLMF', (req, res) => {
    // console.log('get')
    res.render('new')
})

//lmsf -life-minded sub folder
//1:32
router.get('/view/:id/new', (req, res) => {
    // console.log('get view')
    let context = {id: req.params.id}
    res.render('newSub', context)
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

  //need check req.body.priority. If no value, create.
    //If value provided, add in req.body(calculate alert time)
    //once day is calc, req.body will take field of remindDate
router.post('/i', (req, res) => {
    // console.log(req.body)
    if (req.body.name) {
        Mind.create(req.body, 
            {
                LifeFolder: 
                {
                    name: req.body.name,
                }
            },
            // console.log("controller", req.query),
            // {new: true}
        )
            .then(() => {
                res.redirect('/lm/i')
            })
            .catch(console.error)
    }

    if (req.body.sname && req.body.id) 
    {
           Mind.findByIdAndUpdate({ _id: req.body.id},
    {
        $set:
        {
                "LifeFolder.subFolder.sname": req.body.sname
        }
    }
        
        // {new: true}
        )
        .then(() => {
            res.redirect(`/lm/i/view/${req.body.sname}/${req.body.id}`)
        })
        .catch(console.error)
    }

})

// router.post('/view/name/new', (req, res) => {
//     console.log('post view')
//     res.send('this got sent')
 

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

router.delete('/i/:id', (req, res) => {
    const id = req.params.id
    Mind.findOneAndRemove({_id: id})
    .then(() => {
        res.redirect('/lm/i');
    })
    .catch(console.error)
})
module.exports = router