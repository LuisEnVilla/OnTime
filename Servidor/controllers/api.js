var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/ruta/:ruta', function(req, res) {
	db.coordis.find({ruta : req.params.ruta },function (err, coordenadas){
	   res.send([{lat: 41.40338,lng: 21.40338, date:Date.now()}]);
		if (err) res.render('error', {
	    	message: err.message,
	        error: {}});
	    else {
	    }

	});
});

router.post('/ruta/:ruta', function(req, res) {
	var coordenada = new db.coordis({
		ruta: req.params.ruta,
	    lat: req.body.lat,
	    lng: req.body.lng,
	    date:req.body.date
		});
		//mensajes.save();
		console.log(coordenada);
		res.send(coordenada);
});



module.exports = router;