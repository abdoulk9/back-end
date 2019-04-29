
const express = require('express');

const router = express.Router();

const todoModel = require('../models/todo-model');


//Liste de toutes les tâches
router.get('/', (req, res) => {
    todoModel.find((err, data) => {
        if (err) {
            console.log(err);
            res.json(err);
        } else {
            res.json(data);
        }
    });
});

//Ajout d'une tâche
router.post('/new', (req, res) => {
    //Création
    let newtask = new todoModel({
        taskName: req.body.taskName,
        done: req.body.done,
        createdAt: new Date(req.body.dateString)
    });

    //Sauvegarde de la tâche
    newtask.save((err) => {
        if (err) {
            res.json({ success: false, error: err });//On renvois une clé succèe
        } else {
            res.json({ success: true });
        }
    });
});


//Gestion de la suppression
router.delete('/:id', (req, res) => {
    todoModel.remove(
        { _id: req.params.id },
        (err) => {
            if (err) {
                res.json({ success: false, error: err });
            } else
                res.json({ success: true });
        })
});

//Gestion de l'authentification
router.post('/:persons', (req, res) =>{
    
})

module.exports = router;