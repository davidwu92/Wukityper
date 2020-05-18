import React, { useState } from 'react'

import UserAPI from '../../utils/ScoreAPI'; //for sending results to db
// import { set } from 'mongoose';

const TypeTest = () => {
  const [testState, setTestState] = useState({
    username: "",
    test: "",
    testContent: "",
  })
  testState.handleInputChange = (e) => {
    setTestState({[e.target.name]: e.target.value, testContent: testState.testContent})
  }

  const [testString, setTestString] = useState("")
  const aboutString =
    <>About David's Typing Test
      <br/>
      This is where your selected story will appear. 
      The word you must type will appear in green.
      As you type words separated by spaces or line breaks (↵), they should turn grey.
      <br/>
      The test ends after one minute of typing, and counts the number of words you were able to type correctly.
      Each incorrectly-typed word will appear in your typing area in red, and will tick up the total number of incorrectly-typed words.
      Once the test ends, you'll see your typing rate in words per minute (wpm) and typing accuracy as a percentage of the total words typed.
    </>
  const storySelected = () => {
    switch (document.getElementById('storySelect').value) {
      case "story1":
        setTestString("Story 1: The story of Bob and the rabbits.")
        break;
      case "story2":
        setTestString("Story 2: The preamble to the constitution.")
        break;
      case "story3":
        setTestString("Story 3: A summary of our Bill of Rights.")
        break;
      case "story4":
        setTestString("Story 4: The Declaration of Independence.")
        break;
      case "story5":
        setTestString("Story 5: How to build a house.")
        break;
      case "story6":
        setTestString("Story 6: The story of Adam and Eve.")
        break;
      default:
        console.log("You selected nothing.")
    }
  }

  const [typingState, setTypingState] = useState({
    correctWords: [],
    incorrectWords: [],
  })
  typingState.handleKeyDown = (e) => {
    console.log(e)
    console.log(e.keyCode)
    console.log(e.key)
    // let typedCharacter = e.currentTarget.value[e.currentTarget.value.length-1]
    // console.log(typedCharacter)
  }


  return(
    <div className="container">
      <h1 className="center">Take the Typing Test</h1>
      
      {/* TYPE TEST STUFF */}
      <div className="row">
        {/* Name input */}
        <div className="input-field">
          <input className="black-text" placeholder="Your username" type="text" 
            id="username" name="username" value={testState.username} onChange={testState.handleInputChange} />
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

      {/* TEXT TO TYPE POPS UP HERE */}
      <div style={{border: "black", borderWidth: "3px", borderStyle:"double", padding:"5px"}}>
        <div id="testStoryArea" style={{overflowX: "scroll", height:"30vh"}}>
          {testString ? testString : aboutString}
        </div>
        
        <textarea id="typingArea" placeholder="Start typing here to begin the test!"
                  onKeyDown={typingState.handleKeyDown}
                  >
        </textarea>
        
      </div>

      {/* TYPING SPACE HERE */}
      <div>

      </div>
    </div>
  )
}

export default TypeTest