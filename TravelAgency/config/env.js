const dotenv = require('dotenv');

dotenv.config();

if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is required. Add your MongoDB Atlas connection string to .env.');
}

module.exports = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET || 'travelagency-jwt-secret',
    sessionSecret: process.env.SESSION_SECRET || 'travelagency-session-secret',
    adminSetupKey: process.env.ADMIN_SETUP_KEY || 'travelagency-admin-key',
    adminAccessCode: process.env.ADMIN_ACCESS_CODE || 'Ashu2406'
};
