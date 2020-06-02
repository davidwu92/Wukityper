import React from 'react'
import { useHistory } from 'react-router-dom'

const Home = () => {
  let history = useHistory()
  const goToTypeTest = () => {
    history.push('/typetest')
  }

  return(
    <div className="container">
      <div className="row">
        <h4 className="center">Welcome to WukiTyper</h4>
        <h5>About WukiTyper</h5>
        <p style={{textIndent: "30px"}}>My name is David Wu, and I'm the developer behind WukiTyper. I coded this app myself in May of 2020 using React.JS for the front end; the backend is built with a Mongo database and Express server. Please note that <i>no personal information is stored in the database.</i> When a test ends, you'll have the ability to choose a username to store in the database to try and earn a spot in the Top 50 Leaderboards (not unlike a typical Arcade game)! The username, typing speed/accuracy, and article typed are the four pieces of stored data.</p>
        <div className="center">
          <button onClick = {goToTypeTest} className="btn-small black">Take the WukiTyper Test</button>
        </div>
        <h5>About David Wu</h5>
        <p style={{textIndent: "30px"}}>I'm a freelance full-stack web developer and STEM teacher/tutor based in Irvine, California. I graduated from the UC Irvine Coding Bootcamp in February 2020, and spend my days honing my coding skills and building unique web applications. Unsurprisingly, I hold many of the Leaderboard positions, so why not see if you can type faster than me?</p>
        <p className="center">Visit other applications I've created by going to my portfolio or my Github. I'm very open to career opportunities, so connect with me on LinkedIn!</p>
        <div className="col s12 m4 l4 center" style={{marginBottom:"15px"}}>
          <a href="http://davidwu.herokuapp.com" target="_blank" className="btn-small black">David's Online Portfolio</a>
        </div>
        <div className="col s12 m4 l4 center"  style={{marginBottom:"15px"}}>
          <a href="https://github.com/davidwu92" target="_blank" className="btn-small black">David's Github Profile</a>
        </div>
        <div className="col s12 m4 l4 center"  style={{marginBottom:"15px"}}>
          <a href="https://www.linkedin.com/in/davidwu92/" target="_blank" className="btn-small black">David's LinkedIn</a>
        </div>
        <br/>
        <br/>
        <br/>
        <h5>About the WukiTyper Test</h5>
        <p style={{textIndent: "30px"}}>The WukiTyper Test is unique in that it challenges users to type rarer words and sentence structures atypical of daily emails, news articles, and texts. Of course this means the measured typing speed may not be representative of how quickly you type in an everyday email-writing, social-media-posting setting.</p>
        <p style={{textIndent: "30px"}}>WukiTyper uses the Wikimedia API to extract data from Wikipedia articles (I am neither owner nor author of these articles). To take the typing test, you'll select a random English-language article from a small array of article categories; the categories range from science topics to the US Constitution to DC Comics characters. Your goal is to type the characters in that article as quickly and accurately as possible!</p>
        <p style={{textIndent: "30px"}}>Articles available for the test were selected based on the length of the article summary, while avoiding articles with special/non-English characters ("Sigmund Freud (/frɔɪd/ FROYD;[3] German: [ˈziːkmʊnt ˈfʁɔʏt]" is not suitable for an English typing test). However, there's no shortage of interesting English-language articles to peruse as you take the test: perhaps you'll be interested in learning about the electromagnetic spectrum, Superman, or Macbeth as you type away.</p>
        {/* <p style={{textIndent: "30px"}}>There are three test lengths to select from: 30 seconds, 1 minute, or 2 minutes. I don't believe there are any particular advantages of selecting one test length over another: more special characters tend to occur in the first sentences of articles (i.e. a biography of someone's life usually begins with pronunciation guides, birth and death dates) and can right-skew users' typing speeds, but longer test lengths pose the cumbersome challenge of maintaining a high typing speed.</p> */}
      </div>
    </div>
  )
}

export default Home