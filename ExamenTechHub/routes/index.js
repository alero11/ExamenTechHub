var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var mongoose = require('mongoose');

var Aulas = mongoose.model('Aulas');
// GET metodo para obtener aulas
router.get('/aulas', function(req,res,next){
	Aulas.find(function(err,aulas){
		if(err){return next(err)}

		res.json(aulas)
	})
})
// POST metodo para agregar aula
router.post('/aula',function(req,res,next){
	var aula = new Aulas(req.body);
	aula.save(function(err,aula){
		if(err){return next(err)}
		res.json(aula);
	})
})
// PUT metodo para actualizar aula
router.put('/aula/:id',function(req,res){
	Aulas.findById(req.params.id, function(err,aula){		
		aula.nombre = req.body.nombre;

		aula.save(function(err){
			if(err){res.send(err)}
			res.json(aula);
		})
	})
})
// DELETE metodo para eliminar aula
router.delete('/aula/:id',function(req,res){
	Aulas.findByIdAndRemove(req.params.id, function(err){
		if(err){res.send(err)}
		res.json({mensaje: "la tarea se ha eliminado"});
	})
})

module.exports = router;
