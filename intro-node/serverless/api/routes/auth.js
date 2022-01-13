const express = require('express');
const Users = require('../models/Users');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {isAuthenticated} = require('../auth')

const router = express.Router();

const signtoken = ( _id ) => {
    return jwt.sign({_id}, 'mi-secreto', {
        expiresIn: 60*60*24*365,
    })
}
// Para crear un elemento
router.post('/register',(req,res) =>{
    const {email, password} = req.body
    crypto.randomBytes(16, (err, salt)=>{
        const newSalt = salt.toString('base64')
        crypto.pbkdf2(password,newSalt,10000,64,'sha1',(err, key)=>{
            const encryptedPassword = key.toString('base64')
            Users.findOne({ email }).exec()
            .then(user => {
                if (user) {
                    return res.send ('Usuario Existente')
                }
                Users.create({
                    email,
                    password: encryptedPassword,
                    salt: newSalt,
                }).then(()=>{
                    res.send('Usuario Creado Exitosamente')
                })
            })
        })
    })
    
});

// Para crear un elemento
router.post('/login',(req,res) =>{
    const {email, password} = req.body
    Users.findOne({ email }).exec()
    .then(user =>{
        if (!user){
            return res.status(404).send ('Usuario y/o Contraseña Incorrecta')
        }
        crypto.pbkdf2(password,user.salt,10000,64,'sha1',(err, key)=>{
            const encryptedPassword = key.toString('base64')
            if (user.password === encryptedPassword) {
                const token = signtoken(user._id)
                return res.send ({ token })
            }
            res.send('Usuario y/o Contraseña Incorrecta')
        })
    })
})

router.get('/me', isAuthenticated, (req, res) => {
    const { _id, email } = req.user
    res.send({ _id, email })
})


module.exports = router;
