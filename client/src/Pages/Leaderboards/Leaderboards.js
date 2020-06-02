import React, {useEffect, useState} from 'react'
import UserAPI from '../../utils/ScoreAPI'
import { useHistory } from 'react-router-dom'

const {allScores} = UserAPI

const Leaderboards = () => {
  let history = useHistory()

  const [scores, setScores] = useState([])
  
  useEffect(()=>{
    allScores()
    .then(({data})=>{
      console.log(data)
      let arr = data.sort((a,b)=>(a.speed < b.speed)? 1 : (a.speed === b.speed) ? ((a.accuracy < b.accuracy)? 1:-1): -1)
      setScores(arr)
    })
    .catch(e=>console.error(e))
  },[])

  return(
    <div className="container">
      <h3 className="center">Top 50 Leaderboards</h3>
      <table className="centered responsive-table">
        <thead>
          <tr className="blue lighten-4 blue-grey-text text-darken-4">
            <th>Rank</th>
            <th>Username</th>
            <th>Speed (wpm)</th>
            <th>Accuracy</th>
            <th>Article Title</th>
          </tr>
        </thead>
        <tbody>
          {scores.length ? scores.slice(0,50).map((score, index)=>(
            <tr className={index%2? "grey lighten-4":"grey lighten-3"}>
              <td>{index+1}</td>
              <td>{score.username}</td>
              <td>{score.speed}</td>
              <td>{Math.round(score.accuracy*10000)/100}%</td>
              <td>{score.article}</td>
            </tr>
          )):null}
        </tbody>
      </table>


    </div>
  )
}

export default Leaderboards