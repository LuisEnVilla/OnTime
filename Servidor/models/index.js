var mongoose = require('mongoose');
// Descomentar para usar una BD local
mongoose.connect('mongodb://localhost/OnTime',function(err, res) {
//mongoose.connect('mongodb://nodejitsu:e64f3734605edb11e40ec425b159ad7c@troup.mongohq.com:10077/nodejitsudb8852955766',function(err, res) {
	if(!err) console.log('Conectado a BD OnTime');
});

global.db = {
mongoose: mongoose,
//models
coordis : require('./modelsCoords')(mongoose),
unidad : require('./modelsUnidad')(mongoose),
queja : require('./modelsQueja')(mongoose),
catalogoQuejas : require('./modelsCatalogoQuejas')(mongoose),
paradas : require('./modelsParadas')(mongoose),
ruta : require('./modelsRuta')(mongoose)
// agregar más modelos aquí en caso de haberlos
};
module.exports = global.db;