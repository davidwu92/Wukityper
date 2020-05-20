import React, { useState } from 'react'

import UserAPI from '../../utils/ScoreAPI'; //for sending results to db
// import { set } from 'mongoose';
import "./TypeTest.css"

const TypeTest = () => {
  // nameState contains username. that's it.
  const [nameState, setNameState] = useState({username: ""})
  nameState.handleInputChange = (e) => {
    setNameState({[e.target.name]: e.target.value, testContent: nameState.testContent})
  }

  //storyString contains the story to be typed. Empty string if no story selected.
  const aboutString =`About David's Typing Test↵This is where the article you chose will appear. The word you must type will appear in green. As you type words separated by spaces or line breaks (marked with the "return" symbol), they should turn grey.↵The test ends after one minute of typing, and counts the number of words you were able to type correctly. Each incorrectly-typed word will appear in your typing area in red, and will tick up the total number of incorrectly-typed words. Once the test ends, you'll see your typing rate in words per minute (wpm) and typing accuracy as a percentage of the total words typed.`
  const [storyString, setStoryString] = useState(aboutString)

  // Story Selection function; sets storyString to the contents of a story to type.
  const storySelected = () => {
    setTypedWords([])
    switch (document.getElementById(`storySelect`).value) {
      case `0`:
        setStoryString(aboutString)
        break;
      case `story1`:
        setStoryString(`Story 1: The story of Bob and the rabbits.↵Bob was once a proud farmer who loved to shoot pesky rabbits.`)
        break;
      case `story2`:
        setStoryString(`Story 2: The preamble to the constitution.`)
        break;
      case `story3`:
        setStoryString(`Story 3: A summary of our Bill of Rights.`)
        break;
      case `story4`:
        setStoryString(`Story 4: The Declaration of Independence.`)
        break;
      case `story5`:
        setStoryString(`Story 5: How to build a house.`)
        break;
      case `story6`:
        setStoryString(`Story 6: The story of Adam and Eve.`)
        break;
      default:
        setStoryString(aboutString)
    }
  }

  // This function renders the story string.
  const storyFunction = () => <>
  {
    storyString.replace(/↵/g, "↵ ").split(" ").map((word, index, array)=>(
      word[word.length-1]==="↵"?
      <>{index<typedWords.length-1 ? 
        <><span className="grey-text">{word.slice(0,-1)}</span><br/></>
        :<><span className={index==typedWords.length-1?"green-text":""}>{word.slice(0,-1)}</span><br/></>}
      </>
      :<>
        {index<typedWords.length-1 ?
        <><span className="grey-text">{word}{" "}</span></>
        :<><span className={index==typedWords.length-1 ? "green-text":""}>{word}{" "}</span></>
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
      console.log("HandleKeyDown: TYPED WORDS:")
      console.log(typedWords)
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
      if(e.charCode!=32 && e.charCode!=13){
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
        setTypedWords(JSON.parse(JSON.stringify(newArray)))
        document.getElementById("typedString").innerHTML = null
      } else if (e.charCode === 13){ //when Enter is pressed...
        e.preventDefault()
        //add "↵" to last element...
        newArray[newArray.length-1] = newArray[newArray.length-1] + "↵"
        newArray[newArray.length] = ""
        setTypedWords(JSON.parse(JSON.stringify(newArray)))
        document.getElementById("typedString").innerHTML = null
      } else { //non-Space, non-Enter character registered.
        e.preventDefault()
        newArray[newArray.length-1] = newArray[newArray.length-1] + e.key
        setTypedWords(JSON.parse(JSON.stringify(newArray)))
        document.getElementById("typedString").innerHTML = null
      }
      console.log("HandlekeyPress: TYPED WORDS: ")
      console.log(typedWords)
    }
  }
  //this function tracks your progress and shows what you've typed.
  const typedFunction = () => <>
    {typedWords.length ? typedWords.map((word, index, array)=>(
      word[word.length-1]!=="↵" ? 
          storyString.split(/↵| /)[index]!==word.slice(0,-1) && index<array.length-1 ?
            <><span className="red-text" data-mistake="mistake"><u>{word.slice(0,-1)}</u>{" "}</span></>
            :<span>{word}</span>
        : storyString.split(/↵| /)[index]!==word.slice(0,-1) && index<array.length-1 ?
          <><span className="red-text" data-mistake="mistake"><u>{word.slice(0,-1)}</u></span><br/></>
          :<><span>{word.slice(0,-1)}</span><br/></>
    )):null}
  </>

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
          <option value="0" selected>Select Story</option>
          <option value="story1">Story 1</option>
          <option value="story2">Story 2</option>
          <option value="story3">Story 3</option>
          <option value="story4">Story 4</option>
          <option value="story5">Story 5</option>
          <option value="story6">Story 6</option>
        </select>

      </div>

      {/* TYPING TEST: story content, typing area */}
      <div style={{border: "black", borderWidth: "3px", borderStyle:"double", padding:"5px"}}>
        {/* Story content */}
        <div id="testStoryArea" style={{overflowY: "scroll", height:"25vh", lineHeight:"1.7"}}>
          {storyFunction()}
        </div>
        
        {/* Typing area as a DIV */}
        <div style={{width:"100%", border:"black",
              borderStyle:"solid", borderWidth:"1px", margin:"5px 0px 0px 0px"}}>
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
        </div>

      </div>
      
      <div>
        <button onClick={()=>{console.log(typedWords)}}>check typedWords</button>
        <button onClick={()=>{console.log(storyString.split(" "))}}>see storyString</button>
        <button onClick={()=>{console.log(document.getElementById("typedWordsDiv").innerHTML)}}>seeTypedWordsDiv</button>
        <button onClick={()=>{console.log(document.getElementById("typedWordsDiv").innerHTML.split(`data-mistake="mistake"`).length -1)}}>countMistakes</button>
      </div>
    </div>
  )
}

export default TypeTest