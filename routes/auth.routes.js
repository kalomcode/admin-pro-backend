/*
    Autenticación
    Path: '/api/login/'
*/
const { Router } = require('express');
const AuthCtr = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post( '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El email es obligatorio').not().isEmpty(),
        validarCampos
    ],
    AuthCtr.login
)


module.exports = router;