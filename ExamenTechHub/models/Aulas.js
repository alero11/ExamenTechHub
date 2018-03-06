var mongoose = require('mongoose');

var AulasSchema = new mongoose.Schema({
	id_aula: Number,
	nombre: String
});

mongoose.model('Aulas', AulasSchema);