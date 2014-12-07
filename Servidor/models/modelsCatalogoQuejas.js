module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
  // Objeto modelo de Mongoose
  var SchemaCatalogoQueja = new Schema({
    // Propiedades
    _id : Schema.Types.ObjectId,
    nombreCorto:String,
    descripcion:String
  });
  SchemaCatalogoQueja.set('collection','CatalogoQueja');
  return mongoose.model('catalogoQueja', SchemaCatalogoQueja);
}