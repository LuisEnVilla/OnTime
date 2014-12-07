module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
  // Objeto modelo de Mongoose
  var SchemaParadas = new Schema({
    // Propiedades
    _id : Schema.Types.ObjectId,
    nombre: String,
    lat: Number,
    lng: Number,
    img: String
  });
  SchemaParadas.set('collection','Paradas');
  return mongoose.model('paradas', SchemaParadas);
}