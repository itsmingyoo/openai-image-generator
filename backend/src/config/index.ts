const environment = process.env.NODE_ENV || "development";

interface Config {
  environment: string;
  openaiApiKey: string;
}

const config: Record<string, Config> = {
  development: {
    environment: "development",
    openaiApiKey: process.env.OPENAI_API_KEY || "undefined key: figure it out", // dont think we need this since we have dotenv now, but this is good for testing
  },
};

export { environment }; // Named export
export default config[environment];
