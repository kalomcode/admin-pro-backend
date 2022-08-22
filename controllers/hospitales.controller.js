const { response } = require("express");
const { findByIdAndUpdate } = require("../models/hospital.model");

const Hospital = require('../models/hospital.model');


const getHospitales = async( req, res = response ) => {

    const hospitales = await Hospital.find()
                                    .populate('usuario','nombre img')

    res.json({
        ok: true,
        hospitales
    })

}

const crearHospitales = async( req, res = response ) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {
        
        const hospitalDB = await hospital.save()

        res.json({
            ok: true,
            msg: hospitalDB
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarHospitales = async( req, res = response ) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
     
        const hospital = await Hospital.findById( id );

        if ( !hospital ) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            })
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, {new: true} )

        res.json({
            ok: true,
            hospital: hospitalActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarHospitales = async( req, res = response ) => {

    const _id = req.params.id;

    try {
     
        const hospital = await Hospital.findById( _id );

        if ( !hospital ) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            })
        }

        await Hospital.deleteOne({ _id })

        res.json({
            ok: true,
            msg: 'Hospital eliminado',
            id: _id
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales,
}