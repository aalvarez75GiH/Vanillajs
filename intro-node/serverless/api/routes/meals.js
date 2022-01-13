const express = require('express');
const meals = require('../models/Meals');
const router = express.Router();

// Para obtener un listado de elementos
router.get('/', (req,res) =>{
    meals.find()
    .exec()
    .then(x => res.status(200).send(x)) 
});

// Para obtener solo uno
router.get('/:id', (req,res) =>{
    meals.findById(req.params.id)
    .exec()
    .then(x => res.status(200).send(x)) 
});

// Para crear un elemento
router.post('/',(req,res) =>{
    meals.create(req.body)
    .then(x => res.status(201).send(x));
    
});

// Para actualizar un elemento
router.put('/:id', (req,res) =>{
    meals.findOneAndUpdate(req.params.id,req.body)
    .then(() => res.sendStatus(204))
});

// router.patch('/:id', (req,res) =>{
//     meals.findOneAndUpdate(req.params.id,req.body)
//     .then(x => res.sendStatus(204).send(x))
// });

router.delete('/:id',(req,res)=>{
    meals.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
});


module.exports = router;

