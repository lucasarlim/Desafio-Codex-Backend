const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TasksSchema = new Schema({
    task: { type: String, required: true},
    prioridade: { type: String, required: true}
});

module.exports = mongoose.model("Tasks" , TasksSchema);