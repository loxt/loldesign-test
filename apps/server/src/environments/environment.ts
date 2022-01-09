export const environment = {
  production: false,
  database: {
    name: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
};
