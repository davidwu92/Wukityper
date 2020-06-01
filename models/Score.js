module.exports = (model, Schema) =>{
  const Score = new Schema({
    username: String,
    speed: Number,
    accuracy: Number,
    article: String,
  })

  return model('Score', Score)
}