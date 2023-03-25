const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/require");
const {
  allTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoControllers");

router.use(requireAuth);

router.get("/", allTodos);

router.post("/", addTodo);

router.delete("/:id", deleteTodo);

router.patch("/:id", updateTodo);

module.exports = router;
