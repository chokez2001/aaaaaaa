// import mongoose to create mongoose model
const mongoose = require('mongoose');

// create Schema
const TodoItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date,
    required: true
  },
  
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  }
}, { timestamps: true });

// export this Schema
module.exports = mongoose.model('todo', TodoItemSchema);


