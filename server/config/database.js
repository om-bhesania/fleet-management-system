// database.js
import pkg from 'pg';
import dotenv from 'dotenv';

const { Client } = pkg;
dotenv.config();

const connectDB = async () => {
    try {
        // const client = new Client({
        //     host: process.env.DB_HOST,
        //     port: process.env.DB_PORT,
        //     database: process.env.DB_NAME,
        //     user: process.env.DB_USER,
        //     password: process.env.DB_PASSWORD,
        // })

        const client = new Client({
            connectionString: process.env.DB_URL,
            ssl: {
              rejectUnauthorized: false
            }
          });
        await client.connect();
        console.log('PostgreSQL connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;
