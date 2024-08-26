const express = require("express");
const app = express();

app.use(express.json());

const clientes = [
   { id: 1, nombre: "Angel" },
   { id: 2, nombre: "Roy" },
   { id: 3, nombre: "Alex" },
];

const productos = [
   { id: 1, nombre: "Manzana", precio: 10 },
   { id: 2, nombre: "Pera", precio: 20 },
   { id: 3, nombre: "Platano", precio: 30 },
];

// Ruta para "/"
app.get("/", (req, res) => {
   res.send(`Bienvenido a la API <br> Dirijase a /clientes o /productos`);
});

// Ruta para "/clientes"
app.get("/clientes", (req, res) => {
   res.json(clientes);
});

// Ruta para "/productos"
app.get("/productos", (req, res) => {
   res.json(productos);
});

// Ruta POST para agregar un cliente
app.post("/clientes", (req, res) => {
   const nuevoCliente = {
      id: clientes.length + 1,
      nombre: req.body.nombre,
   };
   clientes.push(nuevoCliente);
   res.status(201).json(nuevoCliente);
});

// Ruta PUT para actualizar un cliente
app.put("/clientes/:id", (req, res) => {
   const clienteId = parseInt(req.params.id);
   const cliente = clientes.find((c) => c.id === clienteId);

   if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
   }

   cliente.nombre = req.body.nombre || cliente.nombre;
   res.json(cliente);
});

// Ruta DELETE para eliminar un cliente
app.delete("/clientes/:id", (req, res) => {
   const clienteId = parseInt(req.params.id);
   const index = clientes.findIndex((c) => c.id === clienteId);

   if (index === -1) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
   }

   clientes.splice(index, 1);
   res.status(204).send();
});

// Rutas para productos: POST, PUT, DELETE
app.post("/productos", (req, res) => {
   const nuevoProducto = {
      id: productos.length + 1,
      nombre: req.body.nombre,
      precio: req.body.precio,
   };
   productos.push(nuevoProducto);
   res.status(201).json(nuevoProducto);
});

app.put("/productos/:id", (req, res) => {
   const productoId = parseInt(req.params.id);
   const producto = productos.find((p) => p.id === productoId);

   if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
   }

   producto.nombre = req.body.nombre || producto.nombre;
   producto.precio = req.body.precio || producto.precio;
   res.json(producto);
});

app.delete("/productos/:id", (req, res) => {
   const productoId = parseInt(req.params.id);
   const index = productos.findIndex((p) => p.id === productoId);

   if (index === -1) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
   }

   productos.splice(index, 1);
   res.status(204).send();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
console.log(`Servidor Express corriendo en el puerto ${port}`);
});
