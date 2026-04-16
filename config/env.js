const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/travelagency',
    jwtSecret: process.env.JWT_SECRET || 'travelagency-jwt-secret',
    sessionSecret: process.env.SESSION_SECRET || 'travelagency-session-secret',
    adminSetupKey: process.env.ADMIN_SETUP_KEY || 'travelagency-admin-key',
    adminAccessCode: process.env.ADMIN_ACCESS_CODE || 'Ashu2406'
};
