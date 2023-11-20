const mongoose= require("mongoose");

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please add at least one task"],
      unique: [true, "task already added"],
    },
    description: {
      type: String,
      required: [true, "please add at least one task"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Date,
      default: null,
    },
    ifFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports= mongoose.model("ToDo", todoSchema);