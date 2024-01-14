// backend/src/controllers is for the logic in the routes
import { RequestHandler } from "express";
import fs from "fs";
import OpenAI from "openai";

export const generate: RequestHandler = async (req, res, next) => {
  console.log("WE ARE HITTING THE FETCH");
  try {
    console.log("STARTING POST REQUEST TO OPENAI");

    const openaiApiKey = process.env.OPENAI_API_KEY;

    const openai = new OpenAI({ apiKey: `${openaiApiKey}` }); // we must instantiate openai for the method, and include our api key here since we're using their library and not an actual fetch

    // fetch image with a prompt
    const image = await openai.images.generate({
      prompt: "A cute baby sea otter",
    });

    console.log("RESPONSE DATA: ", image.data);
    // response ===> image.data:
    // [
    //   {
    //     url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-Qy6xiDqvchmXP64n5v557j14/user-sa7yOUdvDLq0FAoFhos5HvaN/img-nkngdhEGyngVgIUouRMq3jf9.png?st=2024-01-13T21%3A26%3A38Z&se=2024-01-13T23%3A26%3A38Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-01-13T07%3A58%3A14Z&ske=2024-01-14T07%3A58%3A14Z&sks=b&skv=2021-08-06&sig=jtA3%2BXsWxW5m52bnwR40fn7P6wz9qbSxFo8jomYmtEQ%3D'
    //   }
    // ]

    // send data to frontend
    res.status(201).send(image.data);
  } catch (error) {
    console.error("Error in generate route:", error);
    next(error);
  }
};

// try {
//   const openaiApiKey = process.env.OPENAI_API_KEY; // Ensure this is set in your environment
//   const url = "https://api.openai.com/v1/images/generations";

//   const fetchData = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${openaiApiKey}`,
//     },
//     body: JSON.stringify({
//       model: "dall-e-3",
//       prompt: "A cute baby sea otter",
//       n: 1,
//       size: "1024x1024",
//     }),
//   };

//   const response = await fetch(url, fetchData);
//   console.log("BACKEND RESPONSE: ", response);
//   console.log("WE FAILED BECAUSE: ", response.statusText);
//   if (!response.ok) {
//     throw new Error(`Error from OpenAI API: ${response.status}`);
//   }
//   const data = await response.json();
//   console.log("BACKEND DATA IN JSON: ", data);
//   res.send(data); // Send the response data back to the client
// } catch (error: any) {
//   console.error("CAUGHT AN ERROR: ", error.message);
//   next(error); // Forward the error to your error-handling middleware
// }
// };
