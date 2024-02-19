import "./ShowRecipe.css";

import React, { useState } from "react";

import Markdown from "react-markdown";
import ReactMarkdown from "react-markdown";

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const ShowRecipe = (props) => {
  // eslint-disable-next-line
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  const [fruit, setFruit] = useState("");

  const processMessageToChatGPT = async () => {
    setResponse("Generating recipe for " + props.product + "! Please allow up to 5 seconds.");
    console.log(props.product);
    let ingredient = props.product;
    // if (ingredient === "") {
    //   console.log(fruit);
    //   ingredient = fruit;
    // }

    const message_content =
      "Format: Beautiful looking markdown. I am asking you for a recipe with this ingredient " +
      ingredient;
    const apiRequestBody = {
      model: "gpt-3.5-turbo-0125",
      messages: [{ role: "system", content: message_content }],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    const response_str = await response.json();
    // const response_str = JSON.stringify(response_new);
    console.log(response_str);
    if (
      response_str &&
      response_str.choices &&
      response_str.choices.length > 0
    ) {
      const recipe = response_str.choices[0].message.content;
      setResponse(recipe);
    }
  };

  const buttonStyle = {
    margin: "auto",
    fontSize: "16px",
    padding: "10px 20px",
    backgroundColor: "#4CAF50", // A pleasant green
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        {/* <br />
        <input
          type="text"
          value={fruit}
          onChange={(e) => setFruit(e.target.value)}
          placeholder="Enter fruit"
        /> */}
        <br />
        <button style={buttonStyle} onClick={processMessageToChatGPT}>
          Generate a Recipe
        </button>
      </div>
      {/* <p className="recipe-box" style={{ whiteSpace: "pre-wrap" }}>
        {response}
      </p> */}
      <ReactMarkdown className="recipe-box">{response}</ReactMarkdown>
    </div>
  );
};
export default ShowRecipe;
