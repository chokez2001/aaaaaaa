const router = require('express').Router();
const todoItemsModel = require('../models/todoItems');
  

// Add Todo Item to database
router.post('/api/task', async (req, res) => {  
  try {
    const newItem = new todoItemsModel({
      title: req.body.title,
      description: req.body.description,
      completed: false,
      dueDate: req.body.dueDate,
      priority: req.body.priority
    });

    const savedItem = await newItem.save()
    res.status(200).json(savedItem);
  } catch (err) {
    res.json(err);
  }
});


// Get all Todo Items from database
router.get('/api/tasks', async (req, res) => {
  try {
    const allTodoItems = await todoItemsModel.find({});
    res.status(200).json(allTodoItems);
  } catch (err) {
    res.json(err);
  }
});

// Mark item as completed
router.put('/api/task/complete/:id', async (req, res) => {
  try {
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, { $set: { completed: true } });
    res.status(200).json('Task marked as completed');
  } catch (err) {
    res.json(err);
  }
});

// Mark item as not completed
router.put('/api/task/uncomplete/:id', async (req, res) => {
  try {
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, { $set: { completed: false } });
    res.status(200).json('Task marked as not completed');
  } catch (err) {
    res.json(err);
  }
});

// Update task
router.put('/api/task/:id', async (req, res)=>{
  try{
    //find the item by its id and update it
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.status(200).json(updateItem);
  }catch(err){
    res.json(err);
  }
})

// Delete Task   from database
router.delete('/api/task/:id', async (req, res) => {
  try {
    const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Item Deleted');
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
