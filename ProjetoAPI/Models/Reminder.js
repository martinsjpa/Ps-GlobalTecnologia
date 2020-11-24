/* const para utilizar a dependecia mongoose */
const mongoose = require('mongoose');

/* const para montar a tabela no mongoDB*/
const Schema = mongoose.Schema;
/* define a chave primária */
const ObjectId = Schema.ObjectId;
/* Modelo que será utilizado para a criação da tabela no MongoDB */
const Reminder = new mongoose.Schema({
    id:ObjectId,
    title:String,
    content:String,
    priority: Number
});

/* Criação da tabela no MongoDB de acordo com a const Reminder */
mongoose.model('reminder', Reminder);