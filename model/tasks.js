const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TasksSchema = new Schema({
    task: { type: String, required: true},
    prioridade: { type: String, required: true, enum: ['ALTA', "BAIXA"] },
    userid: { type: String }
});

module.exports = mongoose.model("Tasks" , TasksSchema);