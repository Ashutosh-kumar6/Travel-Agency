const mongoose = require('mongoose');
const { mongoUri, hasMongoUri } = require('./env');

let connectionPromise;

const connectDB = async () => {
    if (!hasMongoUri) {
        console.warn(
            'MongoDB connection skipped because MONGO_URI is missing or still uses the placeholder cluster host.'
        );
        return null;
    }

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (connectionPromise) {
        return connectionPromise;
    }

    try {
        connectionPromise = mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 15000
        });
        await connectionPromise;
        console.log('MongoDB connected successfully.');
        return mongoose.connection;
    } catch (error) {
        connectionPromise = undefined;
        const baseMessage = error && error.message ? error.message : 'Unknown MongoDB connection error';
        const atlasHint =
            baseMessage.includes('bad auth') ||
            baseMessage.includes('Authentication failed')
                ? 'Check the Atlas database username/password in MONGO_URI.'
                : baseMessage.includes('ENOTFOUND') ||
                    baseMessage.includes('querySrv') ||
                    baseMessage.includes('Server selection timed out')
                  ? 'Check the Atlas cluster hostname in MONGO_URI and make sure MongoDB Atlas Network Access allows connections from your deployment platform.'
                  : 'Verify MONGO_URI and MongoDB Atlas Network Access settings.';

        throw new Error(`MongoDB connection failed: ${baseMessage} ${atlasHint}`);
    }
};

module.exports = connectDB;
