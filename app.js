const express = require('express');
const mongoose = require('mongoose');
const Producto = require('./models/Producto');
const app = express();
const PORT = 3000;

// --- CONFIGURACIÓN ---
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); 

// ---- CONEXION CON MONGODB ATLAS ----
const uri = "mongodb+srv://admin_tienda:Password123@cluster0.ct4q1c3.mongodb.net/tienda?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
    .then(() => console.log("[ OK ] ¡Conexión exitosa a MongoDB Atlas!"))
    .catch(err => console.log("[FAIL] Error de conexión:", err.message));

// --- RUTAS DE LA TIENDA ---
app.get('/', async (req, res) => {
    const listaProductos = await Producto.find();
    res.render('index', { productos: listaProductos, titulo: "Todos los Productos" }); 
});

app.get('/categoria/:nombreCategoria', async (req, res) => {
    const cat = req.params.nombreCategoria;
    const productosFiltrados = await Producto.find({ categoria: cat });
    res.render('index', { productos: productosFiltrados, titulo: cat.toUpperCase() });
});

app.get('/producto/:id', async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    res.render('detalle', { producto });
});

// --- RUTAS DE ADMINISTRACIÓN (CRUD) ---

// 1. Panel Principal
app.get('/admin', async (req, res) => {
    const productos = await Producto.find();
    res.render('admin', { productos });
});

// 2. Formulario Nuevo
app.get('/admin/nuevo', (req, res) => {
    res.render('formulario', { producto: {}, accion: '/admin/guardar', titulo: 'Nuevo Producto' });
});

// 3. Guardar Nuevo
app.post('/admin/guardar', async (req, res) => {
    await Producto.create(req.body);
    res.redirect('/admin');
});

// 4. Formulario Editar
app.get('/admin/editar/:id', async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    res.render('formulario', { producto, accion: `/admin/actualizar/${producto._id}`, titulo: 'Editar Producto' });
});

// 5. Actualizar
app.post('/admin/actualizar/:id', async (req, res) => {
    await Producto.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/admin');
});

// 6. Eliminar
app.post('/admin/eliminar/:id', async (req, res) => {
    await Producto.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
});

app.listen(PORT, () => console.log(`>>> Servidor en http://localhost:${PORT}`));