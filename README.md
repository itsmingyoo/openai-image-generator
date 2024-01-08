# openai image scanner

## Technology
- Vite/React
    - `npm create vite@latest`
- Javascript
- MongoDB
- Redux
- openAI API
    - `npm install openai@^4.0.0`

# Starting the App
- `npm i` and `npm run dev` in both frontend and backend folders

# /backend/src
- index.ts:           Entry point for your application.
- app.ts:             Core Express application setup.
- routes/:            Directory for route handlers.
- controllers/:       Business logic for handling requests.
- models/:            If using a database, for data models.
- middleware/:        For Express middleware.
- utils/ or helpers/: Utility functions and helper code.
- config/:            Configuration files.

# openAI Request-Response

### curl Request
```
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer OPENAI_API_KEY" \
  -d '{
     "model": "gpt-3.5-turbo",
     "messages": [{"role": "user", "content": "Say this is a test!"}],
     "temperature": 0.7
   }'
```

### Response
```
{
  "id": "chatcmpl-8ec3p4deHpLhvRB8V5RHnuOZa9xYT",
  "object": "chat.completion",
  "created": 1704690117,
  "model": "gpt-3.5-turbo-0613",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "This is a test!"
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 13,
    "completion_tokens": 5,
    "total_tokens": 18
  },
  "system_fingerprint": null
}
```

# Streaming Request
```
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
    const stream = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: "Say this is a test" }],
        stream: true,
    });
    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
}

main();
```

### Parsing Stream
- `npm install --save openai`
```
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
});
```

# Community Libraries for Node
- openai-api by Njerschow
- openai-api-node by erlapso
- gpt-x by ceifa
- gpt3 by poteat
- gpts by thencc
- @dalenguyen/openai by dalenguyen
- tectalic/openai by tectalic

# Create Image
`POST https://api.openai.com/v1/images/generations`
- [Reference](https://platform.openai.com/docs/api-reference/images/create)

### Properties
- prompt
- model
- n
- quality
- response_format
- size
- style
- user
**Returns a list of IMAGE objects**

### Example using curl to create an image
```
curl https://api.openai.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "dall-e-3",
    "prompt": "A cute baby sea otter",
    "n": 1,
    "size": "1024x1024"
  }'
```
