const express = require('express')
const router = express.Router()

const Mind = require('../models/mind-model')

//show all parent folder
router.get('/i', (req, res) => {
    Mind.find({ "LifeFolder.category": {$eq: 'Life'}})
    .then((data) => {
        // console.log(data)
        res.render('index', {data})
    })
    .catch(console.error)
})

//show parent folder name + ids
router.get('/i/view/:name/:id', (req, res) => {
    let context = {name: req.params.name, id: req.params.id}
    // console.log(req.params.id)

    Mind.find( {"LifeFolder.category": {$eq:"subFolder"}, "LifeFolder.parent": req.params.id})
    // Mind.find({_id:req.params.id}, { projection: { _id: 0, "subFolder.sname": 1} }.toArray)
    .then((data) => {
        // let both['context'] = context

        // console.log(both)
        // data.concat(context)
    res.render('view', {data})
})
.catch(console.error)
})

//show form for new parent folder
router.get('/i/newLMF', (req, res) => {
    // console.log('get')
    res.render('new')
})

//show form for child folder while it being attached to parent folder
//1:32
router.get('/i/view/:name/:id/new', (req, res) => {
    // console.log('get view')
    let context = {name: req.params.name, id: req.params.id }
    res.render('newSub', context)
})

router.get('/i/edit/:name/:id', (req, res) => {
    let context = {name: req.params.name, id: req.params.id}
        res.render('edit', context)
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
        console.log('parent')
        Mind.create(req.body, 
            {
                LifeFolder: 
                {
                    name: req.body.name,
                    category: 
                        "Life"
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
        // console.log('i\'m hitting sub')
        // console.log(req.body.name)
        // console.log(req.body)

        Mind.create(req.body,
            {
                LifeFolder: 
                {
                    //db: form
                    parent: req.body.id,
                    name: req.body.sname,
                    category: 
                        "subFolder"
                }
            })
    //     var setter = {};
    //     //do not touch setter on left side
    //     // setter["LifeFolder.subFolder.$.sname"] = req.body.sname.toString()
    //     setter["LifeFolder.subFolder.$.sname"] = req.body.sname.toString

    //     console.log(req.body.sname, 'setter')


    //        Mind.findByIdAndUpdate({ _id: req.body.id},
            
    // {
    //     $push:
    //     {
    //         // setter
    //         "LifeFolder.subFolder.$.sname": {
    //             $each: [req.body.sname],
    //             $position: -1
    //         }
    //     }
        
        // {new: true}
        
        .then(() => { 
         res.redirect(`/lm/i/view/${req.body.name}/${req.body.id}`)
        })
        .catch(console.error)
    }

})

// router.post('/view/name/new', (req, res) => {
//     console.log('post view')
//     res.send('this got sent')
 

router.put('/i/edit/:name/:id', (req, res) => {
    Mind.findByIdAndUpdate(req.params.id,
        {
            LifeFolder: 
            {
                name: req.body.name
            }
        },
        // {new: true}
    )
     .then(() => {
         res.redirect('/lm/i')
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