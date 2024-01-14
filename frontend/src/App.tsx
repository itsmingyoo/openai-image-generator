// import "./index.css";
// import "./App.css";
import React, { useState } from "react";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const generate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log('GENERATING IMAGE BY FETCHING TO POST ROUTE "/generate"...');
      const response = await fetch("http://localhost:3000/generate", {
        // we should still fetch from our backend which is localhost not 127.0.0.1 which is our frontend vite
        // since it is a post route, it won't find it unless we explicitly say its a 'POST' fetch
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      console.log("RESPONSE ===> ", response);

      const data = await response.json();
      console.log("THIS IS JSON() RESPONSE", data);

      // extract url and change the state to rerender with the new image returned
      const imageURL = data[0].url;
      setImageUrl(imageURL);

      return imageURL;
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="md:flex flex-col justify-center items-center">
      <h1>OpenAI Image Generator</h1>
      <p className="my-10">
        This project will manipulate images into a different image.
      </p>
      <br />
      <div>
        <img
          src={
            imageUrl && imageUrl !== ""
              ? imageUrl
              : "https://images.unsplash.com/photo-1597633425046-08f5110420b5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29yZ2l8ZW58MHx8MHx8fDA%3D"
          }
          className=""
        />
      </div>
      <br />
      <form className="md:flex justify-between" onSubmit={generate}>
        <div className="md:flex flex-col">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="       Give a prompt"
            className="md:focus:bg-white md:hover:bg-gray-400 md:focus:border-white md:hover:border"
          ></textarea>
          <button
            className="md:hover:bg-gray-400 dark:disabled:bg-gray-400" // works
            // onClick={generateImage}
          >
            Generate an image
          </button>
        </div>
        <div className="md:flex flex-col">
          <textarea
            placeholder="   Feature coming soon"
            className="md:focus:bg-white md:hover:bg-gray-400 md:focus:border-white md:hover:border"
          ></textarea>
          <button
            className="md:dark:disabled:focus:hover:bg-gray-400" // doesnt works
          >
            Generate Variation
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
