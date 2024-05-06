const express = require("express");
const router = express.Router();
const {
    createTodo,
    getTodo,
    getTodos
} = require("../controllers/todoControllers")

router.get("/", (req, res) => {
  res.json({ msg: "HomePage" });
  console.log("homepage");
});

router.get("/trending", (req, res) => {
  console.log("trending page");
  res.json({ msg: "trending file" });
});

router.get("/list", getTodos);
router.get("/list/:id", getTodo);
router.post("/api/list", createTodo);


module.exports = router;
