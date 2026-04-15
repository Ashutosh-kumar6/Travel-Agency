const app = require('./app');
const connectDB = require('./config/db');
const seedDestinations = require('./config/seedDestinations');
const seedContent = require('./config/seedContent');
const { port } = require('./config/env');

const startServer = async () => {
    await connectDB();
    await seedDestinations();
    await seedContent();

    app.listen(port, () => {
        console.log(`Travel Agency server running on http://localhost:${port}`);
    });
};

startServer().catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exit(1);
});
