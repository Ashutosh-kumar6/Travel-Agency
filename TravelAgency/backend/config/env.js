const dotenv = require('dotenv');

dotenv.config();

const mongoUri = process.env.MONGO_URI || '';
const hasMongoUri = Boolean(mongoUri) && !mongoUri.includes('your-cluster.mongodb.net');

module.exports = {
    port: process.env.PORT || 3000,
    mongoUri,
    hasMongoUri,
    jwtSecret: process.env.JWT_SECRET || 'travelagency-jwt-secret',
    sessionSecret: process.env.SESSION_SECRET || 'travelagency-session-secret',
    adminSetupKey: process.env.ADMIN_SETUP_KEY || 'travelagency-admin-key',
    adminAccessCode: process.env.ADMIN_ACCESS_CODE || 'Ashu2406'
};
