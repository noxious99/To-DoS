const express = require("express");
const router = express.Router();
const {
    createTodo,
    getTodo,
    getTodos,
    deleteTodo,
    updateTodo
} = require("../controllers/todoControllers")

const requireAuth = require("../middleware/reqAuth")

router.use(requireAuth)

router.get("/list", getTodos);
router.get("/list/:id", getTodo);
router.post("/list", createTodo);
router.delete("/list/:id", deleteTodo)
router.patch("/list/:id", updateTodo)


module.exports = router;
