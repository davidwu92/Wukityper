const { Score } = require('../models')

module.exports = app => {
  // GET all high scores
  app.get('/scores', (req, res) => {
    Sticker.find({})
      .then(data=> res.json(data))
      .catch(e=>console.error(e))
  })

  //POST one score
  app.post('/score', (req, res)=>{
    const {name, speed, accuracy} = req.body
    Sticker.create({name, speed, accuracy})
      .then(()=>res.sendStatus(200))
      .catch(e=>console.error(e))
  })
}