const router = require("express").Router();
const Task = require('../models/Task')

router.get("/:id", (req, res, next) => {
  let id = req.params.id
  Task.find().populate('creater')
    .then(() =>{
      Task.find({'creater': id})
        .then(tasksByCreater =>{
          res.status(200).json({tasksByCreater})
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({ message: 'Internal Server Error' })
        })
    })
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
