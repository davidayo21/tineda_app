const mongoose = require('mongoose'); // <--- ¡ESTA LÍNEA TE FALTA!

const productoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    categoria: String,
    imagen: String,
    descripcion: String // El campo nuevo para el detalle
});

module.exports = mongoose.model('Producto', productoSchema);