module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  // DB_URL: process.env.DB_URL || 'postgresql://capstone1@localhost/capstone1',
  DB_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET ||'change-this-secret',
 CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || '*',
} 