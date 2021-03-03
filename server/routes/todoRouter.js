const express = require('express');
const router = express.Router();
const todoModel = require('../model/todo.model');

router.get('/delete/:id', (req, res) => {

    todoModel.findByIdAndDelete(req.params.id, null, (err) => {
        if (err) {
            console.log('error occured while trying to delete todo');
            res.send({message: err.message || 'error while trying to delete'});
        } else {
            res.redirect('/');
        }
    });

});

router.get('/:id', (req, res) => {
    todoModel.findById(req.params.id).lean().exec((err, doc) => {
        if (err) {
            console.log('find by id error', err);
            res.send({message: err.message || 'findbyid error'});
        } else {
            res.render('edit_todo', {todos: doc});
        }
    });
});

router.post('/:id', (req, res) => {
    if (!req.body) {
        console.log('can not update with empty body!');
        res.status(400).send({message: 'body shouldnt be empty'});
    } else {
        todoModel.findByIdAndUpdate(req.params.id, {text: req.body.text}, {runValidators: true}, (err) => {
            if (err) {
                console.log('update error');
                res.send({message: err.message || 'update error'});
            } else {
                res.redirect('/');
            }
        })
    }

});

router.post('/', (req, res) => {
    const todo = new todoModel({
        text: req.body.text
    });

    todo.save().then(data => {
        res.redirect('/');
    }).catch(err => {
        console.log('Todo Insertion error', err);
        res.status(500).send({message: err.message || 'insertion error'})
    });

});

router.get('/', (req, res) => {
    const todos = todoModel.find().lean().exec((err, docs) => {
        if (err) {
            console.log("Error while retrieving", err);
            res.status(500).send({message: err.message || 'retrieving error'});
        } else {
            res.render('index', {todos: docs});
        }
    });
});


module.exports = router;