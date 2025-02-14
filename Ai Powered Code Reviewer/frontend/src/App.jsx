import { useState, useEffect} from "react";
import "./App.css";
import prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import axios from "axios"
import Markdown from 'react-markdown'
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"

function App() {

  let [code, setCode] = useState(`function sum(){
    return 1+1
  }`)

  let [review, setReview] = useState("")
    

  const reviewCode = async() => {
    try {

      setReview("Your code is Being Reviewed.Please wait.... ")
      const response = await axios.post('http://localhost:4000/ai/get-review',{code})

      // console.log(response.data)
      setReview(response.data);

    }catch{
      setReview("Server Busy!!! Sorry for Inconvinience...")
    }
  }

  useEffect(() => {
    prism.highlightAll()
  }, [])
  

  return (
    <>
      <div className="flex">
        <div className="top">
          <h2>AI Code Reviewer</h2>
        </div>
        <div className="bottom">
          <main>
            <div className="left">
              <div className="code">
                <Editor
                value = {code}
                onValueChange={code => setCode(code)}
                highlight={code => prism.highlight(code,prism.languages.javascript,"javascript")}
                padding={10}
                style={{
                  fontSize: "1.1rem",
                  fontFamily: "Fira Code",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  overflow: "auto",
                  height: "100%",
                  width: "100%"
                }}
                />

              </div>
              <div className="review" onClick={reviewCode}>Review</div>
            </div>
            <div className="right">
              <Markdown rehypePlugins={[rehypeHighlight]} >{review}</Markdown>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
