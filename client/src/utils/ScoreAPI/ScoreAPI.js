import axios from 'axios'

const ScoreAPI = {
  // get all score:
  allScores: () => axios.get('/scores'),

  // post score:
  addScore: (score) => axios.post('/scores', score)
}

export default ScoreAPI