const express = require("express");
const router = express.Router();
const validateToken=require("../middleware/validateTokenHandler")
const {
  getActiveTodo,
  getTodoById,
  createToDo,
  updateToDo,
  deleteAllToDos,
  softDeleteToDo,
  permanentlyDeleteToDo,
  toggleActiveStatus,
} = require("../controllers/todoController");

router.use(validateToken);
router.route("/").get(getActiveTodo).post(createToDo).delete(deleteAllToDos);
router.route("/:id").get(getTodoById).delete(softDeleteToDo);
router.route("/:id/toggle").put(toggleActiveStatus);
router.route("/:id/delete").delete(permanentlyDeleteToDo);
router.route("/:id/managetodos").put(updateToDo);
module.exports = router;
