/**
 * Confession Routes
 * Express router mapping HTTP endpoints directly to controller methods.
 */

const express = require('express')
const router = express.Router()
const confessionController = require('../controllers/confession.controller')

// Route: Create new confession
router.post('/confessions', confessionController.createConfession)

// Route: Retrieve all confessions
router.get('/confessions', confessionController.getAllConfessions)

// Route: Retrieve single confession by ID
router.get('/confessions/:id', confessionController.getConfessionById)

// Route: Retrieve confessions by category
router.get('/confessions/category/:cat', confessionController.getConfessionsByCategory)

// Route: Delete confession by ID
router.delete('/confessions/:id', confessionController.deleteConfession)

module.exports = router
