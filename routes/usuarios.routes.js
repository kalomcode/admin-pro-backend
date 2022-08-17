/*
    Usuarios
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const UsuariosCtr = require('../controllers/usuarios.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', 
    [
        validarJWT,
    ], 
    UsuariosCtr.getUsuarios 
);

router.post( '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'Email con formato invalido').isEmail(),
        validarCampos,
    ],   
    UsuariosCtr.crearUsuario 
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'Email con formato invalido').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    UsuariosCtr.actualizarUsuario
);

router.delete( '/:id',
    [
        validarJWT,
    ],
    UsuariosCtr.borrarUsuario
)

module.exports = router;