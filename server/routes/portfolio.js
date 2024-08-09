// routes/portfolioRoutes.js

const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

// Endpoint untuk mendapatkan semua portofolio
router.get('/', portfolioController.getAllPortfolios);

// Endpoint untuk mendapatkan portofolio berdasarkan ID
router.get('/:id', portfolioController.getPortfolioById);

// Endpoint untuk membuat portofolio baru
router.post('/', portfolioController.createPortfolio);

// Endpoint untuk mengupdate portofolio
router.put('/:id', portfolioController.updatePortfolio);

// Endpoint untuk menghapus portofolio
router.delete('/:id', portfolioController.deletePortfolio);

module.exports = router;
