import express from 'express';
import connectToDatabase from './config/dbConnect.js';
import routes from './routes/index.js';

const connection = await connectToDatabase();

connection.on('error', (error) => {
    console.error('connection error', error);
});

connection.once('open', () => {
    console.log('DB connection successful.');
});

const app = express();
routes(app);

export default app;