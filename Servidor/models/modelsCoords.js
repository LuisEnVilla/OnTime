module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
  // Objeto modelo de Mongoose
  var SchemaCoords = new Schema({
    // Propiedades
    _id : Schema.Types.ObjectId,
    ruta: String,
    lat: Number,
    lng: Number,
    date:String
  });
  SchemaCoords.set('collection','Coords');
  return mongoose.model('coords', SchemaCoords);
}