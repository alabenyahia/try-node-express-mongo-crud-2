const mongoose = require('mongoose');

const todoScheme = new mongoose.Schema({
    text:{
        type: String,
        required: true
    }
});

const todoModel = mongoose.model('todo', todoScheme);

module.exports = todoModel;