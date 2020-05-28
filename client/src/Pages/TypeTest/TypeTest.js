import React, { useState, useRef, useEffect } from 'react'

import UserAPI from '../../utils/ScoreAPI'; //for sending results to db
// import { set } from 'mongoose';
import "./TypeTest.css"
import axios from 'axios';

const TypeTest = () => {
  // nameState contains username. that's it.
  const [nameState, setNameState] = useState({username: ""})
  nameState.handleInputChange = (e) => {
    setNameState({[e.target.name]: e.target.value, testContent: nameState.testContent})
  }

  //SCRAPING FUNCTIONS
  async function getArticle(titleArray){
    let title = "Barack_Obama"
    if(titleArray.length){
      title = titleArray[Math.floor(Math.random()*titleArray.length)]
    }
    console.log(title)
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
    console.log(jsonRes);
    let scrapedString = Object.values(jsonRes.query.pages)[0].extract

    // console.log(scrapedString)
    let arr = scrapedString.split("\n")
    let formattedStory = arr.join("↵")
    //NOTE TO SELF: could do more formatting to ensure new sentences begin with spaces and we omit any special characters.
    console.log(formattedStory)
    setStoryString(formattedStory)
    // const jsonText = await response.text();
    // console.log(jsonText)
  }

  //storyString contains the story to be typed. Empty string if no story selected.
  const aboutString =`About David's Typing Test↵Start by selecting an article category from the dropdown menu. The summary of a random Wikipedia article from the selected category will appear in this text box, and you'll have as much time as you wish to read through its contents before you begin typing. Once you type something into the yellow box, the timer will start and the typing test will commence!↵The word (or character) you must type will appear in green. As you type words separated by spaces or line breaks (marked with the "return" arrow), the typed words will turn grey. Incorrectly-typed words will show up in underlined, red text in your typing area. You cannot use the arrow keys to move the text cursor, nor can you use keyboard shortcuts such as Control+Shift+LeftArrow or Shift+Home to mass edit previously typed words; however, you are free to press the backspace key to re-type words. You can practice now by typing the words in this tutorial to get a feel for how both the typing area and the article area function!↵The test ends once the timer hits 0 or when the entire article has been typed: whichever comes first. The total number of correctly-typed words will count towards your typing speed. Your typing speed will be measured in words per minute (wpm). Meanwhile, the total number of words typed incorrectly (without being fixed) will adversely affect your accuracy. Your accuracy will be calculated as a percentage: correctly-typed words divided by total number of typed words.↵That's all there is to know about David's Typing test! I hope you enjoy this fun, possibly-educational typing test.`
  const [storyString, setStoryString] = useState(aboutString)

  // Story Selection function; sets storyString to the contents of a story to type.
  const storySelected = () => {
    setTypedWords([])
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
        titleArray = ["George_Washington", "Abraham_Lincoln", "John_Adams", "Barack_Obama", "Thomas_Jefferson"]
        break;
      case `story3`:
        titleArray = ["C._S._Lewis", "J._K._Rowling", "J._R._R._Tolkien", "Lewis_Carroll"]
        break;
      case `story4`:
        titleArray = ["Special_relativity", "Electromagnetic_spectrum", "Photosynthesis",
        "Gravity", "Chemical_bond", "Molecule", "Chemical_element", "Periodic_table"]
        break;
      case `story5`:
        titleArray = ["Sigmund_Freud"]
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
  
  const [typedWords, setTypedWords] = useState([])

  const handleKeyDown = (e) =>{//this function will handle special key presses in the typing area.
    // console.log(e.keyCode)
    // console.log(e.key)
    if (e.keyCode === 8){
      console.log("You pressed Backspace.")
      if (typedWords[0]){
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
      }
    } else { //typedWords isn't empty
      let newArray = typedWords
      if(e.charCode ===32){ //when Space is pressed...
        e.preventDefault()
        //add " " to last element...
        newArray[newArray.length-1] = newArray[newArray.length-1] + " "
        newArray[newArray.length] = ""
        console.log(newArray)
        setTypedWords(JSON.parse(JSON.stringify(newArray)))
        document.getElementById("typedString").innerHTML = null
      } else if (e.charCode === 13){ //when Enter is pressed...
        e.preventDefault()
        //add "↵" to last element...
        newArray[newArray.length-1] = newArray[newArray.length-1] + "↵"
        newArray[newArray.length] = ""
        console.log(newArray)
        setTypedWords(JSON.parse(JSON.stringify(newArray)))
        document.getElementById("typedString").innerHTML = null
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
            :<span>{word}</span>
        : storyString.replace(/↵/g, "↵ ").split(" ")[index]!==word && index<array.length-1 ?
          <><span className="red-text" data-mistake="mistake"><u>{word}</u></span><br/></>
          :<><span>{word}</span><br/></>
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

  return(
    <div className="container">
      <h1 className="center">Take the Typing Test</h1>
      
      {/* USERNAME + STORY SELECT*/}
      <div className="row">
        {/* Name input */}
        <div className="input-field">
          <input className="black-text" placeholder="Your username" type="text" 
            id="username" name="username" value={nameState.username} onChange={nameState.handleInputChange} />
        </div>

        {/* select a Story */}
        <select
          className="browser-default"  id="storySelect"
          options={{
            classes: '', dropdownOptions: {
              alignment: 'left',
              autoTrigger: true, closeOnClick: true, constrainWidth: true,
              container: null, coverTrigger: true, hover: false,
              inDuration: 150, onCloseEnd: null, onCloseStart: null,
              onOpenEnd: null, onOpenStart: null, outDuration: 250
            }
          }}
          onChange={storySelected}
        >
          <option value="0" selected>Select Article</option>
          <option value="story1">US Historic Documents</option>
          <option value="story2">US Presidents</option>
          <option value="story3">Famous Authors</option>
          <option value="story4">Physics, Chemistry, and Biology</option>
          <option value="story5">Famous Psychologists</option>
          <option value="story6">Celestial Bodies in our Solar System</option>
          <option value="story7">DC Comics Characters</option>
        </select>

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
      
      <div>
        <button onClick={()=>{console.log(typedWords)}}>check typedWords</button>
        <button onClick={()=>{console.log(storyString.split(" "))}}>see storyString</button>
        <button onClick={()=>{console.log(document.getElementById("typedWordsDiv").innerHTML)}}>seeTypedWordsDiv</button>
        <button onClick={()=>{console.log(document.getElementById("typedWordsDiv").innerHTML.split(`data-mistake="mistake"`).length -1)}}>countMistakes</button>
        {/* <button onClick={getArticle}>get article</button> */}
        {/* <button onClick={getTitle}>get title</button> */}
      </div>
    </div>
  )
}

export default TypeTest