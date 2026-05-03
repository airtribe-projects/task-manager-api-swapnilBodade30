

const data = require('../task.json');
const fs = require('node:fs');

function getAllTasks(req, res) {

    const queryParams = req.query;
    let tasks = data.tasks.sort((a, b) => a.id - b.id);
    if(queryParams?.completed !== undefined){
        tasks = tasks.filter(task => task.completed === Boolean(queryParams.completed));
    }

    res.json({
        tasks: tasks,
        success: true
    });
}

function getTaskById(req, res) {

    const taskId = req.params.id;
    let task;
    task = data.tasks.find(task => task.id === parseInt(taskId));
    
    if (!task) {
        return res.status(404).json({
            success: false,
            message: 'Task not found'
        });
    }

    res.json({
        task: task,
        success: true
    });
}

function postTask(req, res){
    const task = req.body;
    console.log(task);

    if(!task.description || !task.title || typeof task.status !== 'boolean'){
        return res.status(400).json({
            success: false,
            message: 'Description, title and status are required'
        });
    }

    const newTask = {
        id: data.tasks.length + 1,
        priority: task.priority || 'low',
        ...task
    };

    data.tasks.push(newTask);

    fs.writeFileSync('./task.json', JSON.stringify(data));

    res.json({
        task: newTask,
        success: true,
        message: 'Task created successfully'
    });
}

function updateTaskPut(req,res){
    const id = req.params.id;
    const task = req.body;
    console.log(id, task);

    if(id && task){
        const tempData = [...data.tasks];
        const tempDataId = tempData.find(task => task.id === parseInt(id));
        const index = tempData.findIndex(task => task.id === parseInt(id));
        if(!tempDataId){
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }
        tempData[index].title = task.title;
        tempData[index].description = task.description;
        tempData[index].status = task.status;
        tempData[index].priority = task.priority || 'low';
        fs.writeFile('./task.json', JSON.stringify({ tasks: tempData }), (err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
            }
            res.json({
                task: tempData[index],
                success: true,
                message: 'Task updated successfully'
            });
        });
    }
}

function deleteTask(req,res){
    const id= req.params.id;

    if(id){
        const tempData = [...data.tasks];
        const tempDataId = tempData.find(task => task.id === parseInt(id));
        const index = tempData.findIndex(task => task.id === parseInt(id));
        if(!tempDataId){
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }
        tempData.splice(index, 1);
        fs.writeFile('./task.json', JSON.stringify({ tasks: tempData }), (err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
            }
            res.json({
                success: true,
                message: 'Task deleted successfully'
            });
        });
    }
}

function getTaskByLevel(req, res) {
    const level = req.params.level;
    const tasks = data.tasks.filter(task => task.priority === level);
    res.json({
        tasks: tasks,
        success: true
    });
}

module.exports = {
    getAllTasks,
    getTaskById,
    postTask,
    updateTaskPut,
    deleteTask,
    getTaskByLevel
};