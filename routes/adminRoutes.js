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

router.get('/admin/:accessCode/login', validateAdminAccessCode, renderAdminLoginPage);
router.post('/admin/:accessCode/login', validateAdminAccessCode, loginAdmin);
router.get('/admin/:accessCode/create', validateAdminAccessCode, renderAdminRegisterPage);
router.post('/admin/:accessCode/create', validateAdminAccessCode, createAdmin);
router.get('/admin/:accessCode/dashboard', validateAdminAccessCode, protectAdmin, renderDashboard);
router.post('/admin/:accessCode/items', validateAdminAccessCode, protectAdmin, createCatalogItem);
router.get('/admin/:accessCode/items/:id/edit', validateAdminAccessCode, protectAdmin, renderEditCatalogItemPage);
router.patch('/admin/:accessCode/items/:id', validateAdminAccessCode, protectAdmin, updateCatalogItem);
router.delete('/admin/:accessCode/items/:id', validateAdminAccessCode, protectAdmin, deleteCatalogItem);
router.post('/admin/:accessCode/pages', validateAdminAccessCode, protectAdmin, createPage);
router.get('/admin/:accessCode/pages/:id/edit', validateAdminAccessCode, protectAdmin, renderEditPage);
router.patch('/admin/:accessCode/pages/:id', validateAdminAccessCode, protectAdmin, updatePage);
router.delete('/admin/:accessCode/pages/:id', validateAdminAccessCode, protectAdmin, deletePage);
router.patch('/admin/:accessCode/bookings/:id/status', validateAdminAccessCode, protectAdmin, updateBookingStatus);
router.get('/admin/:accessCode/destinations/:id/edit', validateAdminAccessCode, protectAdmin, renderEditDestinationPage);
router.patch('/admin/:accessCode/destinations/:id', validateAdminAccessCode, protectAdmin, updateDestination);
router.delete('/admin/:accessCode/destinations/:id', validateAdminAccessCode, protectAdmin, deleteDestination);

module.exports = router;
