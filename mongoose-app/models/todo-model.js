const mongoose = require('mongoose');

const Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost/formation', { useNewUrlParser: true });

const todoSchema = new Schema(
    {
        taskName: String,
        done: Boolean,
        createAt:  Date
    }
);
//Les parametres sont le nom de ma collection et le format correspondant aux contenus
module.exports = mongoose.model('task', todoSchema);