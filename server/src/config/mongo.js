import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

export async function connectMongo() {
    await mongoose.connect(MONGO_URL);
}

mongoose.connection.once('open', () => {
    console.log('MongoDB connected successfully.');
});

mongoose.connection.on('error', (e) => {
    console.log('MongoDB error occured:', e);
});