var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/ruta/:ruta', function(req, res) {
	db.coordis.find({ruta : req.params.ruta },function (err, coordenadas){
		if (err) res.render('error', {
	    	message: err.message,
	        error: {}});
	    else {
	    	res.send(coordenadas);
	    }

	});
});

router.post('/ruta/:ruta', function(req, res) {
	var coordenada = new db.coordis({
		ruta: req.params.ruta,
	    lat: req.body.telefono,
	    lng: req.body.telefono,
	    date:req.body.telefono
		});
		mensajes.save();
});

module.exports = router;