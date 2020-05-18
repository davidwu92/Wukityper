import React from 'react'
import { useHistory } from 'react-router-dom'

const Home = () => {
  let history = useHistory()
  const goToTypeTest = () => {
    history.push('/typetest')
  }

  return(
    <div className="container">
      <h1>Home</h1>
      <button onClick = {goToTypeTest} className="btn black">Get Typing</button>
    </div>
  )
}

export default Home