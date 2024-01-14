// import "./index.css";
// import "./App.css";
import { useState } from "react";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const generateImage = async () => {
    try {
      console.log('GENERATING IMAGE BY FETCHING TO POST ROUTE "/generate"...');
      const response = await fetch("http://localhost:3000/generate", {
        // we should still fetch from our backend which is localhost not 127.0.0.1 which is our frontend vite
        // since it is a post route, it won't find it unless we explicitly say its a 'POST' fetch
        method: "POST",
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
    <div>
      <h1>OpenAI Image Generator</h1>
      <p className="read-the-docs">
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
      <form>
        <textarea className="focus:bg-white hover:bg-black focus:border-white hover:border-black"></textarea>
        <button
          className="md:hover:bg-gray-400 dark:disabled:bg-gray-400" // works
          onClick={generateImage}
        >
          Generate an image
        </button>
        <button
          className="md:dark:disabled:focus:hover:bg-gray-400" // doesnt works
        >
          Generate Variation
        </button>
      </form>
    </div>
  );
}

export default App;
