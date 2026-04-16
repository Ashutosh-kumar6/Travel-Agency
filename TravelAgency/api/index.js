const app = require('../app');
const connectDB = require('../config/db');
const seedDestinations = require('../config/seedDestinations');
const seedContent = require('../config/seedContent');

let readyPromise;

const ensureAppReady = async () => {
    if (!readyPromise) {
        readyPromise = (async () => {
            await connectDB();
            await seedDestinations();
            await seedContent();
        })().catch((error) => {
            readyPromise = undefined;
            throw error;
        });
    }

    await readyPromise;
};

module.exports = async (req, res) => {
    try {
        await ensureAppReady();
        return app(req, res);
    } catch (error) {
        console.error('Vercel request bootstrap failed:', error);
        return app(req, res);
    }
};
