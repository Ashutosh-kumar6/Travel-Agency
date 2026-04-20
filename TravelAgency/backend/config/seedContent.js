const mongoose = require('mongoose');
const CatalogItem = require('../../database/models/CatalogItem');
const SitePage = require('../../database/models/SitePage');

const catalogSeeds = [
    {
        section: 'service',
        title: 'Flight Planning',
        description: 'Luxury and business-friendly flight arrangements tailored to your destination and schedule.',
        priceLabel: 'Premium',
        image: ''
    },
    {
        section: 'service',
        title: 'Hotel Booking',
        description: 'Carefully selected stays with convenience, comfort, and premium amenities.',
        priceLabel: 'Premium',
        image: ''
    },
    {
        section: 'service',
        title: 'Custom Itineraries',
        description: 'Flexible travel plans built around adventure, leisure, food, or family experiences.',
        priceLabel: 'Premium',
        image: ''
    },
    {
        section: 'food',
        title: 'Italian Cuisine',
        description: 'Enjoy authentic dining experiences with curated restaurant recommendations and local favorites.',
        priceLabel: 'From Rs 9,999',
        image: ''
    },
    {
        section: 'food',
        title: 'Japanese Omakase',
        description: 'Explore premium chef-led tasting menus and unforgettable city food culture.',
        priceLabel: 'From Rs 16,499',
        image: ''
    },
    {
        section: 'food',
        title: 'Wine Tours',
        description: 'Pair your travel bookings with vineyard visits and guided culinary add-ons.',
        priceLabel: 'From Rs 12,499',
        image: ''
    },
    {
        section: 'rental',
        title: 'Luxury Cars',
        description: 'Reserve premium vehicles for city travel, long drives, and executive transport.',
        priceLabel: 'From Rs 20,999/day',
        image: ''
    },
    {
        section: 'rental',
        title: 'Private Yachts',
        description: 'Upgrade beach destinations with curated yacht experiences and premium day charters.',
        priceLabel: 'From Rs 1,65,999/day',
        image: ''
    },
    {
        section: 'rental',
        title: 'Private Jets',
        description: 'Add high-end transportation for fast, flexible travel planning.',
        priceLabel: 'From Rs 4,14,999/hr',
        image: ''
    }
];

const pageSeeds = [
    {
        title: 'About',
        slug: 'about',
        heroTitle: 'About Travel Agency',
        summary: 'Learn more about our agency and travel experience.',
        content:
            'We help travelers discover memorable destinations with a modern booking experience, personalized guidance, and support across destinations, food, rentals, and curated services.',
        showInNavbar: false,
        isSystem: true
    }
];

const seedContent = async () => {
    if (mongoose.connection.readyState !== 1) {
        return;
    }

    const [catalogCount, pageCount] = await Promise.all([
        CatalogItem.countDocuments(),
        SitePage.countDocuments()
    ]);

    if (catalogCount === 0) {
        await CatalogItem.insertMany(catalogSeeds);
        console.log('✓ Default catalog content seeded.');
    } else {
        console.log(`✓ Catalog items already exist (${catalogCount} found).`);
    }

    if (pageCount === 0) {
        await SitePage.insertMany(pageSeeds);
        console.log('✓ Default site pages seeded.');
    } else {
        console.log(`✓ Site pages already exist (${pageCount} found).`);
    }
};

module.exports = seedContent;
