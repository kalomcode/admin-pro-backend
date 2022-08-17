const fs = require('fs');

const Usuario = require("../models/usuario.model")
const Medico = require("../models/medico.model")
const Hospital = require("../models/hospital.model")

const borrarImagen = ( path ) => {

    if ( fs.existsSync( path )) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const actualizarImagen = async( tipo, id, nombreArchivo ) => {

    const SWTipo = {
        medicos: async() => {
            const medico = await Medico.findById(id);
            if ( !medico ) {
                console.log('No es un médico por id');
                return false;
            }

            borrarImagen( `./uploads/medicos/${ medico.img }` )

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        },
        hospitales: async() => {
            const hospital = await Hospital.findById(id);
            if ( !hospital ) {
                console.log('No es un hospital por id');
                return false;
            }

            borrarImagen( `./uploads/hospitales/${ hospital.img }` )

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

        },
        usuarios: async() => {
            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            borrarImagen( `./uploads/usuarios/${ usuario.img }` )

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        },
    }
    SWTipo[tipo]()

}

module.exports = {
    actualizarImagen
}