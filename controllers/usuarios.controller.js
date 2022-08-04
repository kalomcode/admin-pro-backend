const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");

const Usuario = require('../models/usuario.model');

const getUsuarios = async(req, res) => {
    
    const usuarios = await Usuario.find({},'nombre email role google');

    res.json({
        ok: true,
        usuarios
    });

}

const crearUsuario = async(req, res = response) => {
    
    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email })

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }
        
        const usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Guardar usuario
        await usuario.save();

        // Generar el token
        const token = await generarJWT( usuario.id )

        res.json({
            ok: true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }

}

const actualizarUsuario = async(req, res) => {

    // TODO: Validar token y comprobar que es el usuario correcto

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        
        // Actualizaciones
        const {password, google, email, ...campos} = req.body;

        if ( usuarioDB.email !== email ) {
            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya esta registrado'
                })
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new: true} );
        
        res.json({
            ok: true,
            usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const borrarUsuario = async( req, res ) => {

    const _id = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( _id );

        if ( !usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.deleteOne({ _id });

        res.json({
            ok: true,
            uid: _id
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}