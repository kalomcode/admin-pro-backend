/*
    Ruta: api/uploads
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const UploadsCtr = require('../controllers/uploads.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(expressFileUpload());

router.put( '/:tipo/:id',
    [
        validarJWT,
    ],
    UploadsCtr.fileUpload
);

router.get( '/:tipo/:foto',
    [
    ],
    UploadsCtr.retornaImagen
);

module.exports = router;