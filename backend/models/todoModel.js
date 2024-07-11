/* eslint-disable no-undef */
const {Schema, model} = require("mongoose");

const TodoSchema = Schema({
    content:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    priority:{
        type: String,
        required: true
    }
});

module.exports = model("Todo", TodoSchema);