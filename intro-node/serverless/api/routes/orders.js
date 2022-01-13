const express = require('express');
const { isAuthenticated, hasRoles} = require('../auth');
const orders = require('../models/Orders');
const router = express.Router();



// Para obtener un listado de elementos
router.get('/', (req,res) =>{
    orders.find()
    .exec()
    .then(x => res.status(200).send(x)) 
});

// Para obtener solo uno
router.get('/:id', (req,res) =>{
    orders.findById(req.params.id)
    .exec()
    .then(x => res.status(200).send(x)) 
});

// Para crear un elemento
router.post('/', isAuthenticated, hasRoles(['admin','user']),(req,res) =>{  //hasRole('user') Se podria utilizar para especificar el role
    const { _id } = req.user
    orders.create({...req.body,user_id: _id})
    .then(x => res.status(201).send(x));
    
});

// Para actualizar un elemento
router.put('/:id',isAuthenticated, (req,res) =>{
    orders.findOneAndUpdate(req.params.id,req.body)
    .then(x => res.sendStatus(204));
});

router.delete('/:id', isAuthenticated, hasRoles(['admin','user']),(req,res)=>{
    orders.findByIdAndDelete(req.params.id,req.body)
    .then(x => res.sendStatus(204));
})

module.exports = router;