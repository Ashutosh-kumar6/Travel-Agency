const express = require('express');
const {
    renderAdminLoginPage,
    renderAdminRegisterPage,
    createAdmin,
    loginAdmin,
    renderDashboard,
    createCatalogItem,
    renderEditCatalogItemPage,
    updateCatalogItem,
    deleteCatalogItem,
    createPage,
    renderEditPage,
    updatePage,
    deletePage,
    updateBookingStatus,
    deleteDestination,
    renderEditDestinationPage,
    updateDestination
} = require('../controllers/adminController');
const { protectAdmin, validateAdminAccessCode } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:accessCode/login', validateAdminAccessCode, renderAdminLoginPage);
router.post('/:accessCode/login', validateAdminAccessCode, loginAdmin);
router.get('/:accessCode/create', validateAdminAccessCode, renderAdminRegisterPage);
router.post('/:accessCode/create', validateAdminAccessCode, createAdmin);
router.get('/:accessCode/dashboard', validateAdminAccessCode, protectAdmin, renderDashboard);
router.post('/:accessCode/items', validateAdminAccessCode, protectAdmin, createCatalogItem);
router.get('/:accessCode/items/:id/edit', validateAdminAccessCode, protectAdmin, renderEditCatalogItemPage);
router.patch('/:accessCode/items/:id', validateAdminAccessCode, protectAdmin, updateCatalogItem);
router.delete('/:accessCode/items/:id', validateAdminAccessCode, protectAdmin, deleteCatalogItem);
router.post('/:accessCode/pages', validateAdminAccessCode, protectAdmin, createPage);
router.get('/:accessCode/pages/:id/edit', validateAdminAccessCode, protectAdmin, renderEditPage);
router.patch('/:accessCode/pages/:id', validateAdminAccessCode, protectAdmin, updatePage);
router.delete('/:accessCode/pages/:id', validateAdminAccessCode, protectAdmin, deletePage);
router.patch('/:accessCode/bookings/:id/status', validateAdminAccessCode, protectAdmin, updateBookingStatus);
router.get('/:accessCode/destinations/:id/edit', validateAdminAccessCode, protectAdmin, renderEditDestinationPage);
router.patch('/:accessCode/destinations/:id', validateAdminAccessCode, protectAdmin, updateDestination);
router.delete('/:accessCode/destinations/:id', validateAdminAccessCode, protectAdmin, deleteDestination);

module.exports = router;
