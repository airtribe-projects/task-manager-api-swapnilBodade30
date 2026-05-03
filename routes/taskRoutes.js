const express = require("express");

const router = express.Router();
const { getAllTasks, getTaskById, postTask, updateTaskPut, deleteTask, getTaskByLevel } = require("../controller/taskController");
const validateTask = require("../middleware/taskMiddleware");

router.get('/', getAllTasks);

router.get('/:id', getTaskById);

router.get('/priority/:level', getTaskByLevel);


router.post('/', validateTask, postTask);

router.put('/:id', validateTask, updateTaskPut);

router.delete('/:id', deleteTask);


module.exports = router;