module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
  // Objeto modelo de Mongoose
  var SchemaUnidad = new Schema({
    // Propiedades
    _id : Schema.Types.ObjectId,
    placa: String,
    marca: String,
    modelo: String,
    ano:Number,
    clase:String,
    niv:String,
    ruta:String
  });
  SchemaUnidad.set('collection','Unidad');
  return mongoose.model('coords', SchemaUnidad);
}