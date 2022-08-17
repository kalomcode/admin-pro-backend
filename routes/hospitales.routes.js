/*
    Hospitales
    Ruta: '/api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const HospitalesCtr = require('../controllers/hospitales.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', 
    [], 
    HospitalesCtr.getHospitales 
);

router.post( '/',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos,
    ],   
    HospitalesCtr.crearHospitales 
);

router.put( '/:id',
    [], 
    HospitalesCtr.actualizarHospitales
);

router.delete( '/:id',
    [],
    HospitalesCtr.borrarHospitales
)

module.exports = router;