const Destination = require('../models/Destination');

const defaultDestinations = [
    {
        name: 'Maldives Escape',
        location: 'Maldives',
        price: 2999,
        description: 'Stay in overwater villas, enjoy crystal-clear lagoons, and relax on white sand beaches.',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80'
    },
    {
        name: 'Paris Highlights',
        location: 'Paris, France',
        price: 1899,
        description: 'Discover iconic landmarks, romantic evenings, and unforgettable culinary experiences.',
        image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=80'
    },
    {
        name: 'Swiss Alps Retreat',
        location: 'Swiss Alps',
        price: 2499,
        description: 'Enjoy luxury mountain stays, scenic train rides, and premium adventure experiences.',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
    },
    {
        name: 'Tokyo Discovery',
        location: 'Tokyo, Japan',
        price: 2399,
        description: 'Experience modern city life, ancient temples, and world-famous food in one trip.',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80'
    }
];

const seedDestinations = async () => {
    const destinationCount = await Destination.countDocuments();

    if (destinationCount === 0) {
        await Destination.insertMany(defaultDestinations);
        console.log('✓ Default destinations seeded.');
    } else {
        console.log(`✓ Destinations already exist (${destinationCount} found).`);
    }
};

module.exports = seedDestinations;
