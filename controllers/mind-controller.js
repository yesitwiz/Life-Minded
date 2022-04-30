const express = require('express')
const router = express.Router()

const Mind = require('../models/mind-model')

//show all parent folder
router.get('/i', (req, res) => {
    Mind.find({ "LifeFolder.category": {$eq: 'Life'}})
    .then((data) => {
        res.render('index', {data})
    })
    .catch(console.error)
})

//show children folder
router.get('/i/view/:name/:id', (req, res) => {
    let context = {name: req.params.name, id: req.params.id}

    Mind.find( 
        {
            "LifeFolder.category":
            {
                 $eq:"subFolder"
            }, 
            "LifeFolder.parent": req.params.id,
        })
    .then((data) => {

        if(data.length == 0)
        {
        res.render('subView', context)
        return 
        }
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
        res.redirect(`/lm/i/todoView/${req.body.parentName}/${req.body.id}`)
        })
})


//show form for new parent folder
router.get('/i/newLMF', (req, res) => {
    // console.log('get')
    res.render('new')
})

//life sub folder

router.get('/i/view/:name/:id/new', (req, res) => {
        let context = {
        name: req.params.name, 
        id: req.params.id 
    }
    res.render('newSub', context)
})
 
//main page edits to life folders
router
    .route('/i/edit/:name/:id')
    .get ((req, res) => {
        let context1 = {name: req.params.name, id: req.params.id}

            res.render('edit', context1)
    })
    .post((req, res) => {
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
    .then((data) => {
        res.render('edit', context2)
    })    
});

//secondary page edit to sub folders
router.get ('/i/view/edit/:name/:id', (req, res) => {
let context1 = {name: req.params.name, id: req.params.id}
        res.render('edit', context1)
})

router.post('/i/view/edit/:name/:id', (req,res) => {
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



router.post('/i', (req, res) => {
    // this create a new lifefolder
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
            // {new: true}
        )
            .then(() => {
                res.redirect('/lm/i')
            })
            .catch(console.error)
}

    //this creates a subfolder
    if (req.body.sname && req.body.id) 
    {
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

router.delete('/i/:id', (req, res) => {
    const id = req.params.id
    Mind.findOneAndRemove({_id: id})
    .then(() => {
        res.redirect('/lm/i');
    })
    .catch(console.error)
})

module.exports = router





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
