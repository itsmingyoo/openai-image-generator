const environment = process.env.NODE_ENV || 'development';

interface Config {
  environment: string;
  // Define other configuration properties here
}

const config: Record<string, Config> = {
  development: {
    environment: 'development',
    // other development-specific settings
  },
  production: {
    environment: 'production',
    // other production-specific settings
  },
  // You can add more environments if needed
};

export { environment }; // Named export
export default config[environment];
