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

//show children folder
router.get('/i/view/:name/:id', (req, res) => {
    let context = {name: req.params.name, id: req.params.id}
    // console.log()

    Mind.find( 
        {
            "LifeFolder.category":
            {
                 $eq:"subFolder"
            }, 
            "LifeFolder.parent": req.params.id,
            // "LifeFolder.parentName": req.params.name
        })
    // Mind.find({_id:req.params.id}, { projection: { _id: 0, "subFolder.sname": 1} }.toArray)
    .then((data) => {
        console.log(data.length)
        // let both['context'] = context

        if(data.length == 0)
        {
        console.log(data, 'if data hit')
        res.render('subView', context)
        return 
        }
        // data.concat(context, 'con')
        console.log(data, 'data')
        // [0]["LifeFolder"]["parentName"]
    res.render('view', {data})
})
.catch(console.error)
})

//show todos
router.get('/i/todoView/:name/:id', (req, res) => {
        let context= {name: req.params.name, id: req.params.id}

        Mind.find(
            {
                "LifeFolder.category":
                {
                    $eq: "todos"
                },
                "LifeFolder.parent": req.params.id,
            })
        .then((data) => {
            // console.log(data, 'todo view data')
            if(data.length == 0)
            {
            res.render('hiddenTodos', context)
            return
            }
        res.render('todos', {data})
            })
        })
        
    
//add todos
router
    .route('/i/todoAdd/:name/:id/new')
    .get((req, res) => {
        let context= {name: req.params.name, id: req.params.id}
            res.render('newTodo', context)
    })
    .post((req, res) => {
        console.log("post todo hit")
        Mind.create(req.body,
            {
                LifeFolder: 
                {
                    //db: form
                    parent: req.body.id,
                    parentName: req.body.parentName,
                    name: req.body.toname,
                    category: 
                        "todos",
                    priority: req.body.priority
                }
            })
        .then(() => {
            // console.log(req.body.id, 'parent id')
        res.redirect(`/lm/i/todoView/${req.body.parentName}/${req.body.id}`)
        })
    })

//show form for new parent folder
router.get('/i/newLMF', (req, res) => {
    // console.log('get')
    res.render('new')
})

//show form for child folder while it being attached to parent folder
//1:32
router.get('/i/view/:name/:id/new', (req, res) => {
        let context = {
        name: req.params.name, 
        id: req.params.id 
    }
    res.render('newSub', context)
})

// router.get('/i/edit/:name/:id', (req, res) => {
//     let context = {name: req.params.name, id: req.params.id}
//         res.render('edit', context)
//     })
 
router
    .route('/i/edit/:name/:id')
    .get ((req, res) => {
        let context1 = {name: req.params.name, id: req.params.id}
        // console.log('main edit get')
        // console.log(req.params.name, 'params') defined
        // console.log(req.body.name, 'body') undefined
            res.render('edit', context1)
    })
    .post((req, res) => {
        console.log('hitting put edit')
        let context2= {name: req.body.name, id: req.params.id}
        console.log(req.params.id, req.params.name )
        Mind.findByIdAndUpdate(req.params.id,
            {
                $set: 
                {
                "LifeFolder.name": req.body.name
                }
                
            },
            {new: true, upsert: false}
            )
    .then((data) => {
        console.log(data, 'then data')
        res.render('edit', context2)
    })    
});

router.get ('/i/view/edit/:name/:id', (req, res) => {
console.log('view edit form')
let context1 = {name: req.params.name, id: req.params.id}
// console.log
        res.render('edit', context1)
})

router.post('/i/view/edit/:name/:id', (req,res) => {
        // console.log(req)
        console.log('view edit post hit')
        let context2= {name: req.body.name, id: req.params.id}

         Mind.findByIdAndUpdate(req.params.id, 
            {
                $set:
                {
                "LifeFolder.name": req.body.name
                }
            },
            {new: true, upsert: false}
            )
            .then(() => {
                res.render('edit', context2)
        })
});



  //need check req.body.priority. If no value, create.
    //If value provided, add in req.body(calculate alert time)
    //once day is calc, req.body will take field of remindDate
router.post('/i', (req, res) => {
    // console.log('i post')
    if (req.body.name) {
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
        console.log('body', req.body.sname)
        console.log('params', req.params.sname)

        Mind.create(req.body,
            {
                LifeFolder: 
                {
                    //db: form
                    parent: req.body.id,
                    parentName: req.body.parentName,
                    name: req.body.sname,
                    category: 
                        "subFolder"
                }
            })
    
        
        .then(() => { 
         res.redirect(`/lm/i/view/${req.body.parentName}/${req.body.id}`)
        })
        .catch(console.error)
    }

})

// router.post('/view/name/new', (req, res) => {
//     console.log('post view')
//     res.send('this got sent')
 

// router.put('/i/edit/:name/:id', (req, res) => {
//     Mind.findByIdAndUpdate(req.params.id,
//         {
//             LifeFolder: 
//             {
//                 name: req.body.name
//             }
//         },
//         // {new: true}
//     )
//      .then(() => {
//          res.redirect('/lm/i')
//      })   
//      .catch(console.error)
// })


router.delete('/i/:id', (req, res) => {
    const id = req.params.id
    Mind.findOneAndRemove({_id: id})
    .then(() => {
        res.redirect('/lm/i');
    })
    .catch(console.error)
})

// router.delete('/i/todoView/:name/:id', (req, res) => {
//     const id = req.params.id
//     Mind.findOneAndRemove(
//         {
//             _id: id,
//             "data.LifeFolder.parentName": req.params.name
//         })
//     .then(() => {
//         console.log(req.body.name, 'par name')
//         res.redirect(`/i/todoView/${req.params.name}`);
//     })
//     .catch(console.error)
// })

module.exports = router