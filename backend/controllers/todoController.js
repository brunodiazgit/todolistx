/* eslint-disable no-undef */
const Todo = require("../models/todoModel");
const validator = require("validator");


const prueba = (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "controlador de prueba exitoso"
    })
}

const createTask = async (req, res) => {
    const parametros = req.body;
    try {
        if (validator.isEmpty(parametros.content) || !validator.isLength(parametros.content, { min: 1, max: 70 })) {
            throw new Error("El contenido es obligatorio, debe tener como mínimo 1 caracter y como máximo 70.");
        } if (validator.isEmpty(parametros.priority)) {
            throw new Error("La prioridad es obligatoria.");
        }
    } catch (e) {
        return res.status(400).json({
            status: "error",
            mensaje: "Algo salió mal: " + e
        })
    }
    try {
        const task = new Todo({ content: parametros.content, priority: parametros.priority });

        const savedTask = await task.save();

        return res.status(200).json({
            status: "success",
            task: savedTask,
            mensaje: "Se ha guardado la tarea exitosamente!!!"
        });
    } catch (e) {
        return res.status(500).json({
            status: "error",
            mensaje: "No se ha guardado la tarea: " + e
        });
    }
}

const getTasks = async (req, res) => {
    try {
        const {priority} = req.query;

        let filter = {};

        if (priority){
            filter.priority = priority;
        }

        const tasks = await Todo.find(filter);

        if (tasks.isLength === 0) {
            return res.status(400).json({
                status: "error",
                mensaje: "No se han encontrado tareas"
            })
        }
        return res.status(200).json({
            status: "success",
            tareas: tasks
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Hubo un error con la solicitud."
        })
    }
}

const deleteOne = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteTodo = await Todo.findOneAndDelete({ _id: id });
        if (!deleteTodo) {
            return res.status(404).json({
                status: "error",
                mensaje: "No existe la tarea con el ID: " + id
            });
        }
        return res.status(200).json({
            status: "success",
            mensaje: "Se ha eliminado con exito la tarea don el ID: " + id,
            todo: deleteTodo
        })
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Ha ocurrido un error tratando de eliminar la tarea: " + error
        })
    }
}

const deleteAll = async (req, res) => {
    try {
        deleteTasks = await Todo.deleteMany({})
        if (deleteTasks.deletedCount === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "No hay tareas para eliminar"
            })
        }
        return res.status(200).json({
            status: "success",

            mensaje: "Tareas eliminadas.",
            deletedTasks: deleteTasks.deletedCount
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "No se ha podido completar la solicitud. " + error
        })
    }
}

const editTask = async(req, res)=>{
    const id = req.params.id;
    const parametros = req.body;
    try{
        if (validator.isEmpty(parametros.content) || !validator.isLength(parametros.content, { min: 1, max: 70 })) {
            throw new Error("El contenido es obligatorio, debe tener como mínimo 1 caracter y como máximo 70.");
        } if (validator.isEmpty(parametros.priority)) {
            throw new Error("La prioridad es obligatoria.");
        }
        const updatedTask = await Todo.findOneAndUpdate({_id: id}, parametros, {new: true})
        if(!updatedTask){
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontro la tarea."
            })
        }
        return res.status(200).json({
            status: "success",
            task: updatedTask,
            mensaje: "tarea actualizada con éxito"
        })
    }catch(error){
        return res.status(500).json({
            status: "error",
            mensaje: "Error al intentar actualizar: " + error
        })
    }
}


module.exports = {
    prueba,
    createTask,
    deleteOne,
    deleteAll,
    getTasks,
    editTask
}