const router = require("express").Router();
const Offer = require('../models/Offer')

router.post("/", (req, res, next) => {
    
    let {tasker, task, offeredAmount, offerAccepted} = req.body
    let data = {tasker, task, offeredAmount, offerAccepted}
    Offer.create(data)
        .then(offerMade =>{
            res.status(201).json({ message: 'Offer Created', offerMade})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Internal Server Error' })
        })
});

router.get("/offers-received/:createrId", (req, res, next)=>{

    let createrId = req.params.createrId

    Offer.find({'task.creater._id': createrId}).populate('task')
        
                .then(response =>{
                    console.log('backend res ' + response)
                })
      
})

router.get("/:taskId/:taskerId", (req, res, next) => {

    let task = req.params.taskId
    let tasker = req.params.taskerId

    Offer.findOne({task, tasker})
        .then(response=>{
            if(response === null)
                res.json({alreadyRequested: false})
            else
                res.json({alreadyRequested: true})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Internal Server Error' })
        })
})

router.get("/:taskId/:taskerId", (req, res, next) => {

    let task = req.params.taskId
    let tasker = req.params.taskerId

    Offer.findOne({task, tasker})
        .then(response=>{
            if(response === null)
                res.json({alreadyRequested: false})
            else
                res.json({alreadyRequested: true})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Internal Server Error' })
        })
})

module.exports = router;
