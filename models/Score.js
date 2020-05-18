module.exports = (model, Schema) =>{
  const Sticker = new Schema({
    name: String,
    speed: Number,
    accuracy: Number,
  })

  return model('Sticker', Sticker)
}