/* eslint-disable no-undef */
const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/todolist");
        console.log("Se ha conectado a la base de datos todolist correctamente.");
    } catch (error) {
        console.log("Ha sucedio un error: " + error);
        throw new Error("No se ha podido conectar a la base de datos todolist.");
    }
}

module.exports = {
    connection
}