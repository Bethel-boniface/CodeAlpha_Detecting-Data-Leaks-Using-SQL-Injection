module.exports = {
  PORT: process.env.PORT || 5000,

  DB_HOST: process.env.DB_HOST,

  DB_PORT: process.env.DB_PORT,

  DB_NAME: process.env.DB_NAME,

  DB_USER: process.env.DB_USER,

  DB_PASSWORD: process.env.DB_PASSWORD,

  JWT_SECRET: process.env.JWT_SECRET,

  AES_SECRET_KEY: process.env.AES_SECRET_KEY,

  NODE_ENV: process.env.NODE_ENV || "development"
};