module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  // DB_URL: process.env.DB_URL || 'postgresql://capstone1@localhost/capstone1',
  DB_URL: process.env.DATABASE_URL || 'postgresql://capstone1@localhost/capstone1',
  JWT_SECRET: process.env.JWT_SECRET ||'change-this-secret',
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL ||
    "http://localhost:3000/api",
} 