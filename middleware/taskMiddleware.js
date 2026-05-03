function validateTask(req,res,next){
    const task = req.body;
    if(!task.description || !task.title || typeof task.status !== 'boolean'){
        return res.status(400).json({
            success: false,
            message: 'Description, title and status are required'
        });
    }
    next();
}

module.exports = validateTask;