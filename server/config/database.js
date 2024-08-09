// database.js
import pkg from 'pg';
import dotenv from 'dotenv';

const { Client } = pkg;
dotenv.config();

const client = new Client({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export const connectDB = async () => {
    try {
        await client.connect();
        console.log('PostgreSQL connected...');
    } catch (err) {
        console.error("DB Error",err.message);
        process.exit(1);
    }
};

export default client;
