const router = require("express").Router();
const Task = require('../models/Task')
const { uploader, cloudinary } = require('../config/cloudinary')

router.get("/", (req, res, next) => {
    Task.find().populate('creater')
        .then(tasks => {
            res.status(200).json({tasks})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Internal Server Error' })
        })
})

router.get("/:id", (req, res, next) => {
    let id = req.params.id
    Task.findById(id).populate('creater')
        .then(task => {
            res.status(200).json({task})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Internal Server Error' })
        })
})

router.get("/posted-tasks/:id", (req, res, next) => {
    let userId = req.params.id
    Task.find({creater: userId}).populate('creater')
        .then(tasks => {
            res.status(200).json({tasks})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Internal Server Error' })
        })
})

router.post("/image-upload", uploader.single('imagePath'), (req, res, next) => {
     
    if (!req.file) {
        next(new Error("No file uploaded!"));
        return;
    }
    
    res.json({ imagePathCloudinary: req.file.path });
    });

router.post("/add", (req, res, next) => {
    const {title, description, category, budget, openToOffers, location,  imagePath, creater, tasker, id} = req.body
    Task.create({title, description, category, budget, openToOffers, location, imagePath, creater, tasker})
        .then(createdTask =>{
            res.status(201).json({ message: 'Task Created', createdTask})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Internal Server Error' })
        })
});

router.put("/edit/:id", (req, res, next) => {
    let id = req.params.id
    Task.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedTask => {
            console.log('updated task ' + updatedTask)
            res.json(updatedTask)
        })    
        .catch(error => res.json(error));
});

router.delete('/:id', (req, res, next) => {
    let id = req.params.id
    console.log(id)
    Task.findByIdAndDelete(id)
        .then(()=>{
            console.log('deleted')
            res.status(200).json({message: 'Task Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Internal Server Error' })
        })
})

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
