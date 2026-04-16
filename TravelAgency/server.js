const app = require('./app');
const connectDB = require('./config/db');
const seedDestinations = require('./config/seedDestinations');
const seedContent = require('./config/seedContent');
const { port } = require('./config/env');

const normalizedPort = Number.parseInt(port, 10) || 3000;
const host = '0.0.0.0';

let server;

const startServer = async () => {
    await connectDB();
    await seedDestinations();
    await seedContent();

    server = app.listen(normalizedPort, host, () => {
        console.log(`Travel Agency server running on port ${normalizedPort}`);
    });

    server.on('error', (error) => {
        console.error('HTTP server failed to start:', error.message);
        process.exit(1);
    });
};

startServer().catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    const message = error instanceof Error ? error.stack || error.message : String(error);
    console.error('Unhandled promise rejection:', message);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error.stack || error.message);
    process.exit(1);
});

process.on('SIGTERM', () => {
    if (!server) {
        process.exit(0);
        return;
    }

    server.close(() => {
        process.exit(0);
    });
});
