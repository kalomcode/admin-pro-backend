const { request, response } = require("express")

const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');

// getTodo
const getTodo = async (req = request, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    const [ usuarios, hospitales, medicos ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
        Medico.find({ nombre: regex })
    ])

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    })
}

const getDocumentosColeccion = async (req = request, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );
    console.log(tabla,busqueda, regex)

    const result = await Medico.find({ nombre: regex })
                        .populate('usuario', 'nombre img')
                        .populate('hospital', 'nombre')
    
    const busquedaTablas = {
        usuarios: async () => (
            await Usuario.find({ nombre: regex })
        ),
        hospitales: async () => (
            await Hospital.find({ nombre: regex })
                          .populate('usuario', 'nombre img')
        ),
        medicos: async () => (
            await Medico.find({ nombre: regex })
                        .populate('usuario', 'nombre img')
                        .populate('hospital', 'nombre')
        ),
    }
    busquedaTablas[tabla]
        ? res.json({
            ok: true,
            resultados: await busquedaTablas[tabla]()
        })
        : res.status(500).json({
            ok: false,
            msg: 'la busqueda ha de ser sobre las colecciones: usuarios/hospitales/medicos'
        })
        
    // const busquedaTablasDefault = () => (
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'la busqueda ha de ser sobre las colecciones: usuarios/hospitales/medicos'
    //     })
    // )
    // const buscar = busquedaTablas[tabla] || busquedaTablasDefault;
    // buscar();
}

module.exports = {
    getTodo,
    getDocumentosColeccion,
}