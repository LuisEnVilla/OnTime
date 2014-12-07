module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
  // Objeto modelo de Mongoose
  var SchemaRuta = new Schema({
    // Propiedades
    _id : Schema.Types.ObjectId,
    nombre: String,
    paradas: [{ type: Schema.ObjectId, ref: 'Paradas' }],
    Origen: String,
    Destino: String
  });
  SchemaRuta.set('collection','Ruta');
  return mongoose.model('ruta', SchemaRuta);
}