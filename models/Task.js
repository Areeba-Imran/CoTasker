const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: String,
    category: String,
    creater: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tasker: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    imagePath: String,
    budget: Number,
    openToOffers: Boolean,
    location: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }

);

const Task = model("Task", taskSchema);

module.exports = Task;
