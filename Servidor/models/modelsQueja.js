module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
  // Objeto modelo de Mongoose
  var SchemaQueja = new Schema({
    // Propiedades
    _id : Schema.Types.ObjectId,
    nombre:String,
    mail:String,
    lat:Number,
    lng: Number,
    queja:String
  });
  SchemaQueja.set('collection','Queja');
  return mongoose.model('queja', SchemaQueja);
}