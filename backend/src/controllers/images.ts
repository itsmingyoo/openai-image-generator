// backend/src/controllers is for the logic in the routes
import { RequestHandler } from "express";
import fs from "fs";
import OpenAI from "openai";

export const generate: RequestHandler = async (req, res, next) => {
  try {
    console.log("STARTING POST REQUEST TO OPENAI");
    const openai = new OpenAI();
    const image = await openai.images.createVariation({
      image: fs.createReadStream("image.png") as any,
    });
    console.log(image.data);
  } catch (error) {
    console.error("Error in generate route:", error);
    next(error);
  }
};

//   try {
//     const openaiApiKey = process.env.OPENAI_API_KEY; // Ensure this is set in your environment
//     const url = "https://api.openai.com/v1/images/generations";

//     const fetchData = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${openaiApiKey}`,
//       },
//       body: JSON.stringify({
//         model: "dall-e-2",
//         prompt: "A cute baby sea otter",
//         n: 1,
//         size: "1024x1024",
//       }),
//     };

//     const response = await fetch(url, fetchData);
//     console.log("BACKEND RESPONSE: ", response);
//     if (!response.ok) {
//       throw new Error(`Error from OpenAI API: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log("BACKEND DATA IN JSON: ", data);
//     res.send(data); // Send the response data back to the client
//   } catch (error: any) {
//     console.error("Error:", error.message);
//     next(error); // Forward the error to your error-handling middleware
//   }
// };
