import React, {useEffect, useState} from 'react'
import UserAPI from '../../utils/ScoreAPI'
import { useHistory } from 'react-router-dom'

const {allScores} = UserAPI

const Leaderboards = () => {
  let history = useHistory()
  // const goToTypeTest = () => {
  //   history.push('/typetest')
  // }

  const [scores, setScores] = useState([])
  
  useEffect(()=>{
    allScores()
    .then(({data})=>{
      console.log(data)
    })
    .catch(e=>console.error(e))
  },[])

  return(
    <div className="container">
      <h3>Leaderboards</h3>
      
    </div>
  )
}

export default Leaderboards