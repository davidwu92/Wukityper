const { Score } = require('../models')

module.exports = app => {
  // GET all high scores
  app.get('/scores', (req, res) => {
    Score.find({})
      .then(data=> res.json(data))
      .catch(e=>console.error(e))
  })

  //POST one score
  app.post('/scores', (req, res)=>{
    console.log(req.body)
    const {username, speed, accuracy, article} = req.body
    Score.create({username, speed, accuracy, article})
      .then(()=>res.sendStatus(200))
      .catch(e=>console.error(e))
  })
}