import "./App.css";

function App() {
  const generateImage = async () => {
    try {
      console.log('GENERATING IMAGE BY FETCHING TO POST ROUTE "/generate"...');
      const response = await fetch("http://127.0.0.1:5173/generate");

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      console.log("RESPONSE ===> ", response);

      const data = await response.json();
      console.log("THIS IS JSON() RESPONSE", data);
      // Process the response here (e.g., displaying the generated image)
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
      <button onClick={generateImage}>Generate an image</button>
    </>
  );
}

export default App;
