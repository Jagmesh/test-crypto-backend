export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT: string;
      POSTGRES_DB_NAME: string;
      POSTGRES_USERNAME: string;
      POSTGRES_PASSWORD: string;
    }
  }
}
