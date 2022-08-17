/*
    Medicos
    Ruta: '/api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const MedicosCtr = require('../controllers/medicos.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', 
    [], 
    MedicosCtr.getMedicos 
);

router.post( '/',
    [
        validarJWT,
        check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital no es válido').isMongoId(),
        validarCampos,
    ],   
    MedicosCtr.crearMedicos 
);

router.put( '/:id',
    [], 
    MedicosCtr.actualizarMedicos
);

router.delete( '/:id',
    [],
    MedicosCtr.borrarMedicos
)

module.exports = router;