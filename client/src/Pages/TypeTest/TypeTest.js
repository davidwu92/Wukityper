import React, { useState, useRef, useEffect } from 'react'

import UserAPI from '../../utils/ScoreAPI'; //for sending results to db
// import { set } from 'mongoose';
import "./TypeTest.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const {addScore} = UserAPI

const TypeTest = () => {
  toast.configure()
  // nameState contains username. that's it.
  const [nameState, setNameState] = useState({username: ""})
  nameState.handleInputChange = (e) => {
    setNameState({[e.target.name]: e.target.value})
  }

  //TEST TIMER
  const [seconds, setSeconds] = useState(60)
  const [isRunning, setIsRunning] = useState(false)
  useEffect(()=> {
    if(isRunning) {
      const id = window.setInterval(()=>{
        setSeconds(seconds => seconds-1)
      },1000)
      return ()=>window.clearInterval(id)
      //WHEN we start this running, useEffect is given this CLEANUP function.
      //this function is called whenever the useEffect happens again (whenever isRunning changes!)
    }
  },[isRunning])
  //test ends.
  useEffect(()=>{
    if(seconds<=0){
      console.log("time's up.")
      endTest()
    }
  },[seconds])

  const [testArticle, setTestArticle] = useState("article title")
  //SCRAPING FUNCTIONS
  async function getArticle(titleArray){
    let title = "Barack_Obama"
    if(titleArray.length){
      title = titleArray[Math.floor(Math.random()*titleArray.length)]
    }
    console.log(title)
    setTestArticle(title.split("_").join(" "))
    let url = "https://en.wikipedia.org/w/api.php"; 
    let params = {
        action: "query",
        prop:"extracts",
        exsentences:"10",
        exlimit: "1",
        titles: title,
        explaintext:"1",
        // formatversion:"2",
        format:"json",
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    console.log(url)
    const response = await fetch(url);
    const jsonRes = await response.json();
    // console.log(JSON.stringify(jsonRes));
    // console.log(jsonRes);
    // const jsonText = await response.text();
    // console.log(jsonText)
    let scrapedString = Object.values(jsonRes.query.pages)[0].extract
    let arr = scrapedString.split("\n") //replace newline char with return symbol
    let formattedEssay = arr.join("↵")
    
    //replace double spaces with single spaces.
    //Put a space in front of every period followed immediately by a letter.
    let formatString = formattedEssay.replace(/ {2}/g, " ").replace(/\.(?=[A-Za-z])/g,". ").replace(/–/g, "-") + "↵"
    console.log(formatString)
    setStoryString(formatString)
  }

  //storyString contains the story to be typed. Empty string if no story selected.
  const aboutString =`About David's Typing Test↵Start by selecting an article category and test length from the dropdown menus. The summary of a random Wikipedia article from the selected category will appear in this text box, and you'll have as much time as you wish to read through its contents before you begin the test. Please note that David does not own the content in these tests, and the available articles consist of English-language-only topics due to the nature of this typing test. After selecting an article and perusing its contents, type something into the yellow box to start the timer and the typing test will commence!↵The word (or character) you must type will appear in green. As you type words separated by spaces or line breaks (marked with the "return" arrow), the typed words will turn grey. Incorrectly-typed words will show up in underlined, red text in your typing area. You cannot use the arrow keys to move the text cursor, nor can you use keyboard shortcuts such as Control+Shift+LeftArrow or Shift+Home to mass edit previously typed words; however, you are free to press the backspace key to re-type words. You can practice now by typing the words in this tutorial to get a feel for how both the typing area and the article area function!↵The test ends once the timer hits 0 or when the entire article has been typed: whichever comes first. The total number of correctly-typed words will count towards your typing speed. Your typing speed will be measured in words per minute (wpm). Meanwhile, the total number of words typed incorrectly (without being fixed) will adversely affect your accuracy. Your accuracy will be calculated as a percentage: correctly-typed words divided by total number of typed words.↵That's all there is to know about David's Typing test! I hope you enjoy this fun, possibly-educational typing test.↵`
  const [storyString, setStoryString] = useState(aboutString)

  // Story Selection function; sets storyString to the contents of a story to type.
  const storySelected = () => {
    setTypedWords([])
    setSeconds(testLength)
    setBackspaceCount(0)
    setTestComplete(false)
    setIsRunning(false)
    setSeeMore(false)
    setScoreSubmitted(false)
    let titleArray = []
    switch (document.getElementById(`storySelect`).value) {
      case `0`:
        setStoryString(aboutString)
        break;
      case `story1`:
        titleArray = ["United_States_Bill_of_Rights", "Constitution_of_the_United_States",
        "First_Amendment_to_the_United_States_Constitution", "Second_Amendment_to_the_United_States_Constitution",
        "Third_Amendment_to_the_United_States_Constitution", "Fourth_Amendment_to_the_United_States_Constitution",
        "Fifth_Amendment_to_the_United_States_Constitution", "Sixth_Amendment_to_the_United_States_Constitution",
        "Seventh_Amendment_to_the_United_States_Constitution", "Eighth_Amendment_to_the_United_States_Constitution",
        "Ninth_Amendment_to_the_United_States_Constitution", "Tenth_Amendment_to_the_United_States_Constitution",
      ]
        break;
      case `story2`:
        titleArray = ["President_of_the_United_States", "George_Washington", "Abraham_Lincoln", "John_Adams", "Barack_Obama", "Thomas_Jefferson",
        "John_F._Kennedy","Lyndon_B._Johnson","Richard_Nixon","Alexander_Hamilton","Benjamin_Franklin","James_Madison",]
        break;
      case `story3`:
        titleArray = ["C._S._Lewis", "J._K._Rowling", "J._R._R._Tolkien", "Lewis_Carroll"]
        break;
      case `story4`:
        titleArray = ["Special_relativity", "Electromagnetic_spectrum", "Photosynthesis",
        "Gravity", "Chemical_bond", "Molecule", "Chemical_element", "Periodic_table"]
        break;
      case `story5`:
        titleArray = ["Macbeth", "Romeo_and_Juliet", "William_Shakespeare", "Hamlet", "The_Comedy_of_Errors", "Antony_and_Cleopatra"]
        break;
      case `story6`:
        titleArray = ["Moon", "Jupiter", "Mercury_(planet)", "Venus", "Mars", "Saturn", "Sun","Uranus","Neptune", "Pluto"]
        break;
      case `story7`:
        titleArray = ["Batman", "Superman","Wonder_Woman","Flash_(comics)","Green_Lantern", "Aquaman",
        "Dick_Grayson", "Catwoman","Barbara_Gordon","Green_Arrow","Roy_Harper_(character)","Justice_League",
      "Captain_Marvel_(DC_Comics)", "Black_Lightning","Joker_(character)","Deathstroke","Lex_Luthor","Suicide_Squad","Riddler"]
        break;
      default:
        setStoryString(aboutString)
        break;
    }
    getArticle(titleArray)
  }

  // This function renders the story string.
  const storyFunction = () => <>
  {
    storyString.replace(/↵/g, "↵ ").split(" ").map((word, index, array)=>(
      word[word.length-1]==="↵"? //if the word ends with Return symbol...
      <>{
        index<typedWords.length-1 ? 
        <><span className="grey-text">{word}</span><br/></> //word.slice(0,-1) turns off Return symbols.
        :
        <>
          {/* <span className={index==typedWords.length-1?"green-text":""}>{word}</span><br/> */}
          {index===typedWords.length-1 ?
          <>
            <span className="green-text">{word}</span><div style={{display:"inline"}} id="articleScrollPoint"/><br/>
          </>
          :<>
            <span>{word}</span><br/>
          </>}
        </>
        }
      </>
      :<>
        {
        index<typedWords.length-1 ? //if there's no return symbol.
        <><span className="grey-text">{word}{" "}</span></>
        :
        <>
          {/* <span className={index===typedWords.length-1 ? "green-text":""}>{word}{" "}</span> */}
          {index===typedWords.length-1 ? 
          <>
            <span className="green-text">{word}{" "}</span><div style={{display:"inline"}} id="articleScrollPoint"/>
          </>
          :
          <>
            <span>{word}{" "}</span>
          </>}
        </>
        }
      </>
    ))
  }
  </>

  const [testLength, setTestLength] = useState(60)
  //This function changes the length of the test.
  const testTimeSelect = () => {
    let testLength = document.getElementById("testTimeSelect").value
    console.log(parseInt(testLength))
    setTestLength(parseInt(testLength))
    setSeconds(testLength)
  }

  const [typedWords, setTypedWords] = useState([])
  const [totalMistakes, setTotalMistakes] = useState(0)
  const [backspaceCount, setBackspaceCount] = useState(0)
  const handleKeyDown = (e) =>{//this function will handle special key presses in the typing area.
    // console.log(e.keyCode)
    // console.log(e.key)
    if (e.keyCode === 8){
      // console.log("You pressed Backspace.")
      if (typedWords[0]){
        setBackspaceCount(backspaceCount=>backspaceCount+1)
        let newArray = typedWords
        if(typedWords[typedWords.length-1]===""){ //if the last thing typed was space/enter...
          let previousWord = newArray[newArray.length-2].length>1 ? 
            newArray[newArray.length-2].slice(0, -1):""
          newArray.splice(-2,2, previousWord)
          setTypedWords(JSON.parse(JSON.stringify(newArray)))
          document.getElementById("typedString").innerHTML = null
        } else { //if the last thing typed was a character...
          let previousWord = newArray[newArray.length-1].length>1 ? 
            newArray[newArray.length-1].slice(0, -1):""
          newArray.splice(-1, 1, previousWord)
          setTypedWords(JSON.parse(JSON.stringify(newArray)))
          document.getElementById("typedString").innerHTML = null
        }
      }
      // console.log("HandleKeyDown: TYPED WORDS:")
      // console.log(typedWords)
    }
    if (e.keyCode === 9){e.preventDefault()} //pressed Tab.
    // if (e.keyCode === 13){console.log("You pressed Enter.")}
    // if (e.keyCode === 16){console.log("You pressed Shift.")}
    // if (e.keyCode === 17){console.log("You pressed Control.")}
    if (e.keyCode === 18){e.preventDefault()}
    // if(e.keyCode === 32){console.log("You pressed Space.")}
  }
  const handleKeyPress = (e) => {//this function will handle any non-special key presses. Gives charCodes.
    // console.log("character code: ")
    // console.log(e.charCode)
    // console.log(e.key)
    if(!typedWords.length){ //if typedWords is empty...
      //only set typedWords if the first key is nonspace, nonenter.
      if(e.charCode!==32 && e.charCode!==13){
        e.preventDefault()
        setTypedWords([e.key])
        document.getElementById("typedString").innerHTML = null
        //start the timer iff storyString isn't equal to aboutString
        if(storyString!=aboutString){
          setIsRunning(true);
        }
      }
    } else { //typedWords isn't empty
      let newArray = typedWords
      if(e.charCode ===32){ //when Space is pressed...
        e.preventDefault()
        //add " " to last element...
        newArray[newArray.length-1] = newArray[newArray.length-1] + " "
        if(newArray[newArray.length-1]!=storyString.replace(/↵/g, "↵ ").split(" ")[newArray.length-1]+" "){
          setTotalMistakes(totalMistakes=>totalMistakes+1)
          console.log("mistakes:" + totalMistakes)
        }
        newArray[newArray.length] = ""
        setTypedWords(JSON.parse(JSON.stringify(newArray)))
        document.getElementById("typedString").innerHTML = null
      } else if (e.charCode === 13){ //when Enter is pressed...
        e.preventDefault()
        //add "↵" to last element...
        newArray[newArray.length-1] = newArray[newArray.length-1] + "↵"
        if(newArray[newArray.length-1]!=storyString.replace(/↵/g, "↵ ").split(" ")[newArray.length-1]){
          setTotalMistakes(totalMistakes=>totalMistakes+1)
          console.log("mistakes:" + totalMistakes)
        }
        newArray[newArray.length] = ""
        setTypedWords(JSON.parse(JSON.stringify(newArray)))
        document.getElementById("typedString").innerHTML = null
        //check if you're at the end of the article.
        if (typedWords.length === storyString.replace(/↵/g, "↵ ").split(" ").length){
          console.log("Finished test")
          endTest()
        }
      } else { //non-Space, non-Enter character registered.
        e.preventDefault()
        newArray[newArray.length-1] = newArray[newArray.length-1] + e.key
        setTypedWords(JSON.parse(JSON.stringify(newArray)))
        document.getElementById("typedString").innerHTML = null
      }
      // console.log("HandlekeyPress: TYPED WORDS: ")
      // console.log(typedWords)
    }
  }
  //this function tracks your progress and shows what you've typed.
  const typedFunction = () => <>
    {typedWords.length ? typedWords.map((word, index, array)=>(
      word[word.length-1]!=="↵" ? 
          storyString.replace(/↵/g, "↵ ").split(" ")[index]!==word.slice(0,-1) && index<array.length-1 ?
            <><span className="red-text" data-mistake="mistake"><u>{word.slice(0,-1)}</u>{" "}</span></>
            :<span data-correct="correct">{word}</span>
        : storyString.replace(/↵/g, "↵ ").split(" ")[index]!==word && index<array.length-1 ?
          <><span className="red-text" data-mistake="mistake"><u>{word}</u></span><br/></>
          :<><span data-correct="correct">{word}</span><br/></>
    )):null}
  </>
  

  //Scroll To Bottom of typing area.
  const typeAreaRef = useRef(null)
  const scrollToBottom = () => {
    typeAreaRef.current.scrollIntoView({ behavior: "smooth" })
    if(document.getElementById("articleScrollPoint")){
      document.getElementById("articleScrollPoint").scrollIntoView({behavior:"smooth", block:"center"})
    }
  }
  useEffect(scrollToBottom, [typedWords])

  //testTimer
  const testTimer = 
  <>
    <div>
      <h5 className="purple-text center">Time Remaining: {seconds}</h5>
    </div>
  </>

//END OF TEST STATISTICS
  const [testComplete, setTestComplete] = useState(false) //set to true when endTest.
  const [netMistakes, setNetMistakes] = useState(0) //number of UNFIXED mistakes.
  const [finalSpeed, setFinalSpeed] = useState(0) //correctly-typed words / timeTaken.
  const [finalAccuracy, setFinalAccuracy] = useState(0) //correctly-typed words / typedTotal
  const [totalAccuracy, setTotalAccuracy] = useState(0) //correctly-typed words / typedTotal

  const [typedTotal, setTypedTotal] = useState(0) //number of words typed.
  const [timeTaken, setTimeTaken] = useState(60) //time taken; usually equal to testLength.
  const [typedChars, setTypedChars] = useState(0) //number of characters typed.

  const [scoreSubmitted, setScoreSubmitted]=useState(false)
  const [seeMore, setSeeMore]=useState(false)
  const endTest = () =>{
    setTestComplete(true)
    setIsRunning(false)
    // setSeconds(0)
    let countMistakes = document.getElementById("typedWordsDiv").innerHTML.split(`data-mistake="mistake"`).length -1
    let totalWords
    if(typedWords[typedWords.length-1]===""){
      totalWords = typedWords.length-1
    } else if (storyString.replace(/↵/g, "↵ ").split(" ")[typedWords.length-1] != typedWords[typedWords.length-1]) {
      totalWords = typedWords.length-1
    } else {
      totalWords = typedWords.length
    }
    let countCorrect = totalWords - countMistakes

    let countCharacters = 0
    typedWords.forEach(word => {
      countCharacters += word.length
    })
    setTypedChars(countCharacters)
    // console.log("total mistakes: "+ totalMistakes)
    // console.log("mistakes: " + countMistakes)
    // console.log("correct: "+ countCorrect)
    // console.log("total: " + totalWords)
    setTypedTotal(totalWords)
    setNetMistakes(countMistakes)
    setTotalAccuracy((totalWords-totalMistakes)/totalWords)
    setFinalAccuracy(countCorrect / totalWords)
    
    if(seconds === 0){
      setTimeTaken(testLength)
      setFinalSpeed(countCorrect / testLength * 60)
    } else {
      setTimeTaken(testLength-seconds)
      setFinalSpeed(countCorrect / (testLength-seconds)*60)
    }
  }
  const showAdditional = (e)=>{
    e.preventDefault()
    setSeeMore(!seeMore)
  }
  const submitResults = (e) => {
    e.preventDefault()
    console.log(nameState.username)
    if(nameState.username.length){
      if(scoreSubmitted===false){
        toast(`You submitted your test results under the username "${nameState.username}".`,
        {autoClose: 5000,hideProgressBar: true,type: "success"})
        addScore({username: nameState.username, speed: finalSpeed, accuracy: finalAccuracy, article: testArticle})
          .then(()=>{
            console.log("okay")
          })
          .catch(e=>console.error(e))
        setScoreSubmitted(true)
      }
    } else {
      toast(`You must provide a username.`,
      {autoClose: 5000,hideProgressBar: true,type: "error"})
    }
  }

  return(
    <div className="container">
      <h3 className="center">Take the Typing Test</h3>
      
      {/* USERNAME + STORY SELECT*/}
      <div className="row">
        <div className="col s12 m8 l8">
          {/* select a Story */}
          { isRunning ? <select
            className="browser-default"  id="storySelect"
            disabled
            options={{
              classes: '', dropdownOptions: {
                alignment: 'left',
                autoTrigger: true, closeOnClick: true, constrainWidth: true,
                container: null, coverTrigger: true, hover: false,
                inDuration: 150, onCloseEnd: null, onCloseStart: null,
                onOpenEnd: null, onOpenStart: null, outDuration: 250,
              }
            }}
          >
            <option value="0" disabled selected>About David's Typing Test (not a test)</option>
            <option value="story1">On US Historic Documents</option>
            <option value="story2">On US Presidents and Founding Fathers</option>
            <option value="story3">On Famous American and English Authors</option>
            <option value="story4">On Physics, Chemistry, and Biology</option>
            <option value="story5">On William Shakespeare</option>
            <option value="story6">On Celestial Bodies in our Solar System</option>
            <option value="story7">On DC Comics Characters</option>
          </select>
          :
          <select
            className="browser-default"  id="storySelect"
            options={{
              classes: '', dropdownOptions: {
                alignment: 'left',
                autoTrigger: true, closeOnClick: true, constrainWidth: true,
                container: null, coverTrigger: true, hover: false,
                inDuration: 150, onCloseEnd: null, onCloseStart: null,
                onOpenEnd: null, onOpenStart: null, outDuration: 250,
              }
            }}
            onChange={storySelected}
          >
            <option value="0" disabled selected>About David's Typing Test (not a test)</option>
            <option value="story1">On US Historic Documents</option>
            <option value="story2">On US Presidents and Founding Fathers</option>
            <option value="story3">On Famous American and English Authors</option>
            <option value="story4">On Physics, Chemistry, and Biology</option>
            <option value="story5">On William Shakespeare</option>
            <option value="story6">On Celestial Bodies in our Solar System</option>
            <option value="story7">On DC Comics Characters</option>
          </select>}
        </div>
        <div className="col s12 m4 l4">
          {/* SELECT TEST LENGTH */}
          {isRunning ? <select
            className="browser-default"  id="testTimeSelect"
            disabled
            options={{
              classes: '', dropdownOptions: {
                alignment: 'left',
                autoTrigger: true, closeOnClick: true, constrainWidth: true,
                container: null, coverTrigger: true, hover: false,
                inDuration: 150, onCloseEnd: null, onCloseStart: null,
                onOpenEnd: null, onOpenStart: null, outDuration: 250
              }
            }}
            onChange={testTimeSelect}
          >
            <option value="60" disabled selected>Select Test Length</option>
            {/* <option value="1">1 Second</option> */}
            <option value="30">30 Seconds</option>
            <option value="60">One Minute</option>
            <option value="120">Two Minutes</option>
          </select>
          :<select
            className="browser-default"  id="testTimeSelect"
            options={{
              classes: '', dropdownOptions: {
                alignment: 'left',
                autoTrigger: true, closeOnClick: true, constrainWidth: true,
                container: null, coverTrigger: true, hover: false,
                inDuration: 150, onCloseEnd: null, onCloseStart: null,
                onOpenEnd: null, onOpenStart: null, outDuration: 250
              }
            }}
            onChange={testTimeSelect}
          >
            <option value="60" disabled selected>Select Test Length</option>
            {/* <option value="1">1 Second</option> */}
            <option value="30">30 Seconds</option>
            <option value="60">One Minute</option>
            <option value="120">Two Minutes</option>
          </select>}
        </div>

      </div>

      {/* TYPING TEST: story content, typing area */}
      <div style={{border: "black", borderWidth: "3px", borderStyle:"double", padding:"5px", fontSize:"large"}}>
        {/* Story content */}
        <div id="testStoryArea" style={{overflowY: "scroll", height:"25vh", lineHeight:"1.7"}}>
          {typedWords.length && document.getElementById("storySelect").value!=="0" ? null:<div style={{display:"inline"}} id="articleScrollPoint"/>}
          {storyFunction()}
        </div>
        
        {/* Typing area as a DIV */}
        <div className="blue lighten-4" style={{width:"100%", border:"black", maxHeight: "6em",
              borderStyle:"solid", borderWidth:"1px", margin:"5px 0px 0px 0px", overflowY:"scroll"}}>
            {/* Previously-typed words appear here. */}
            <div id="typedWordsDiv" style={{display:"inline"}}>{typedFunction()}</div>

            {/* editable typing area: 1 character at a time. */}
            <div style={ typedWords[0]?
                  {textIndent:"4px", display: "inline-block", backgroundColor:"antiquewhite", margin:"none", 
                    border:"none", width:"5px"}
                  :{textIndent:"4px", display: "inline-block", backgroundColor:"antiquewhite", margin:"0", 
                        border:"none", width:"inherit", color:"grey"}
                }
              id="typedString" name="typedString" contentEditable 
              //add a timer, disable these functions when time runs out.
              onKeyDown={handleKeyDown}
              onKeyPress={handleKeyPress}>{typedWords[0]?null:"Start typing here to begin the test."}
              </div>
            
            {/* dummy component for scrolling to bottom */}
            <div ref={typeAreaRef}/>
        </div>

      </div>
      
      {isRunning || !testComplete ? testTimer:<><br/></>}

      <div className="row purple lighten-2 white-text center"
        style={testComplete ? {visibility:"visible", borderWidth:"3px", borderStyle:"double"}:{visibility:"hidden"}}>
          <h4 className="center"><u>Test Results</u></h4>
          <div className="col s6 m6 l6 center">
            <h5 id="totalWords">Words Typed: {typedTotal}</h5>
            <h5 id="showAccuracy"><b>Accuracy: {Math.round(finalAccuracy*10000)/100}%</b></h5>
          </div>
          <div className="col s6 m6 l6 center">
            <h5 id="showMistakes">Net Mistakes: {netMistakes}</h5>
            <h5 id="finalSpeed"><b>Speed: {finalSpeed} wpm</b></h5>
          </div>
        {/* OTHER STATS */}
        {seeMore ? <>
          <div>
            <div className="col s6 m6 l6 center blue lighten-2">
              <h6 id="typedChars"><i>Typed Characters:</i> {typedChars}</h6>
              <h6 id="backspaceCount"><i>Backspace Count:</i> {backspaceCount}</h6>
              <h6 id="charSpeed"><i>Speed (characters per minute):</i> {typedChars / timeTaken * 60}</h6>
            </div>
            <div className="col s6 m6 l6 center blue lighten-2">
              <h6 id="totalMistakes"><i>Total Mistakes (including fixed):</i> {totalMistakes}</h6>
              <h6 id="totalAccuracy"><i>Typing Accuracy:</i> {Math.round(totalAccuracy*10000)/100}%</h6>
              <h6 id="totalSpeed"><i>Typing Speed (including mistakes):</i> {typedTotal / timeTaken * 60} wpm</h6>
            </div>
          </div>
        </>:<></>}
        <h6><a className="blue-text text-lighten-2" onClick={showAdditional}>{seeMore ? "Hide Additional Results":"Show Additional Results"}</a></h6>
          <div className="input-field col s12 m10 l9 center">
            <input className="white black-text center" placeholder="Your username" type="text" 
              id="username" name="username" value={nameState.username} onChange={nameState.handleInputChange} />
          </div>
          <div className="input-field col s12 m2 l3 center" style={{paddingTop:"1%"}}>
            <button onClick={submitResults} 
              className={scoreSubmitted ? "btn-small black white-text disabled":"btn-small black white-text"}>
              Submit Results
            </button>
          </div>
          <div className="input-field col s12 m12 l12">
            <button onClick={storySelected} className="btn-small black white-text">Take Another Test</button>
          </div>
      </div>
      
      {/* <button onClick={dummyPost}>DUMMY POST</button> */}
    </div>
  )
}

export default TypeTest