import { connect, disconnect } from 'mongoose'

async function connectToDatabase() {
    try {
        console.log('Connecting to database:', process.env.MONGODB_URL); // Optional: For debugging
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error("Cannot Connect to MongoDB.");
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
        throw new Error("Could not disconnect from MongoDB.");
    }
}

export { connectToDatabase, disconnectFromDatabase };
