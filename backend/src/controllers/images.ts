// backend/src/controllers is for the logic in the routes
import { RequestHandler } from "express";
import fs from "fs";
import OpenAI from "openai";

export const generate: RequestHandler = async (req, res, next) => {
  console.log("WE ARE HITTING THE FETCH");
  try {
    console.log("STARTING POST REQUEST TO OPENAI");
    const { prompt } = req.body; // the only way to extract this from req.body is to use the express middleware in your app.ts backend - placed before routes - `app.use(express.json())` - this parses the body for you

    console.log("THIS IS THE BODY BACKEND", prompt);
    const openaiApiKey = process.env.OPENAI_API_KEY;

    const openai = new OpenAI({ apiKey: `${openaiApiKey}` }); // we must instantiate openai for the method, and include our api key here since we're using their library and not an actual fetch

    // fetch image with a prompt
    const image = await openai.images.generate({
      prompt: `${prompt ? prompt : "a cute little sea otter!"}`,
    });

    console.log("RESPONSE DATA: ", image.data);
    // response ===> image.data:
    // [
    //   {
    //     url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-Qy6xiDqvchmXP64n5v557j14/user-sa7yOUdvDLq0FAoFhos5HvaN/img-nkngdhEGyngVgIUouRMq3jf9.png?st=2024-01-13T21%3A26%3A38Z&se=2024-01-13T23%3A26%3A38Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-01-13T07%3A58%3A14Z&ske=2024-01-14T07%3A58%3A14Z&sks=b&skv=2021-08-06&sig=jtA3%2BXsWxW5m52bnwR40fn7P6wz9qbSxFo8jomYmtEQ%3D'
    //   }
    // ]

    console.log("END OF FETCH");

    // send data to frontend
    res.status(201).send(image.data);
  } catch (error) {
    console.error("Error in generate route:", error);
    next(error);
  }
};
