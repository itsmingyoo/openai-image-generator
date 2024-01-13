import "./App.css";
import { useState } from "react";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const generateImage = async () => {
    try {
      console.log('GENERATING IMAGE BY FETCHING TO POST ROUTE "/generate"...');
      const response = await fetch("http://localhost:3000/generate", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      console.log("RESPONSE ===> ", response);

      const data = await response.json();
      console.log("THIS IS JSON() RESPONSE", data);
      const imageURL = data[0].url;
      setImageUrl(imageURL);
      return imageURL;
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <>
      <h1>openAI Image Scanner</h1>
      <div className="card">
        <p>Hello, from openAI</p>
      </div>
      <p className="read-the-docs">
        This project will manipulate images into a different image.
      </p>
      <br />
      <img
        src={
          imageUrl && imageUrl !== ""
            ? imageUrl
            : "https://images.unsplash.com/photo-1597633425046-08f5110420b5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29yZ2l8ZW58MHx8MHx8fDA%3D"
        }
      />
      <br />
      <button onClick={generateImage}>Generate an image</button>
    </>
  );
}

export default App;
