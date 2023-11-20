//how data will be stored in db
//first create schema of model and import here

const asyncHandler = require("express-async-handler");
const ToDo = require("../model/todoModel");


//@desc Get all active todo
//@route GET /api/todo
//@access public
const getActiveTodo = asyncHandler(async (req, res) => {
  const todo = await ToDo.find({deleted:null});
  res.status(200).json(todo);
});

//@desc Get individual todo
//@route GET /api/todo/:id
//@access public
const getTodoById = asyncHandler(async (req, res) => {
  const todo = await ToDo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error("Task not found");
  }
  res.status(200).json(todo);
});

//@desc create  todo
//@route POST /api/todo
//@access public
const createToDo = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400);
    throw new Error("Please fill at least one task to do");
  }
  const todo = await ToDo.create({ title, description });
  res.status(201).json(todo);
  console.log(" Task Added Successfully");
});

//@desc update todo
//@route PUT /api/todo/:id
//@access public
const updateToDo = asyncHandler(async (req, res) => {
  const todo = await ToDo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error("Task not found");
  }

  const updatedToDo = await ToDo.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );

  res.status(200).json(updatedToDo);
  console.log("Task updated Succesfully");
});

const toggleActiveStatus = asyncHandler(async (req, res) => {
  const todo = await ToDo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error("Task not found");
  }
  todo.completed = !todo.completed;
  await todo.save();
  res.json({ message: "Todo status toggled successfully.", todo });
});

//@desc delete temporary todo
//@route delete /api/todo/:id
//@access public
const softDeleteToDo = asyncHandler(async (req, res) => {
  const todo = await ToDo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error("Task not found");
  }
  todo.deleted = new Date(); // Mark the document as deleted
  await todo.save();
  res.json({
    message:"Task soft deleted successfully.",
    todo
});
});

//@desc delete permanently todo
//@route delete /api/todo/:id
//@access public
const permanentlyDeleteToDo = asyncHandler(async (req, res) => {
  const todo = await ToDo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error("Task not found");
  }
  await ToDo.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "deleted successfully" });
});

async function deleteAllToDos(req, res) {
  try {
    const result = await ToDo.deleteMany({ completed: true });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "No completed todos found to delete.",
        user: req.user,
      });
    }

    return res.status(200).json({
      message: `${result.deletedCount} todos successfully deleted.`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getActiveTodo,
  createToDo,
  getTodoById,
  updateToDo,
  softDeleteToDo,
  permanentlyDeleteToDo,
  deleteAllToDos,
  toggleActiveStatus,
};
