const bcrypt = require("bcryptjs/dist/bcrypt");
const { response } = require("express");
const { generarJWT } = require("../helpers/jwt");

const Usuario = require('../models/usuario.model')

const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {

        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña o email incorrectos' // No hay que darle pistas al usuario de cual de las dos esta mal
            })
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password)
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña o email incorrectos'
            });
        }

        // Generar el token
        const token = await generarJWT( usuarioDB.id )

        res.status(200).json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}