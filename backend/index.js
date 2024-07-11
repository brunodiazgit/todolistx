/* eslint-disable no-undef */
const {connection} = require("./connection");
const express = require("express");
const cors = require("cors");

console.log("Conexión a la base de datos inicializada.");
connection();

const app = express();
const puerto = 3900;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const todoRotues = require("./routes/todoRoutes");

app.use("/todolist", todoRotues);




app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto: " + puerto);
})