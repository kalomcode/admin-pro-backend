/*
    Ruta: api/todo/:busqueda
*/

const { Router } = require('express');

const BusquedasCtr = require('../controllers/busquedas.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/:busqueda',
    [
        validarJWT
    ],
    BusquedasCtr.getTodo
);

router.get( '/coleccion/:tabla/:busqueda',
    [
        validarJWT
    ],
    BusquedasCtr.getDocumentosColeccion
);

module.exports = router;