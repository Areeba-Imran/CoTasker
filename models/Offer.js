const { Schema, model } = require("mongoose");

const offerSchema = new Schema(
  {
    tasker: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    task:{
        type:Schema.Types.ObjectId,
        ref: 'Task'
    },
    offeredAmount: {
        type: Number,
        required:true
    },
    offerAccepted: Boolean
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }

);

const Offer = model("Offer", offerSchema);

module.exports = Offer;
