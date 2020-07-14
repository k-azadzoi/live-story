// Homepage Route
const express = require('express')
const router = express.Router()
const { authUser } = require('../middleware/auth')

const Story = require('../models/Story')

//Setting up Routes

// Show add page
// route GET /stories/add
router.get('/add', authUser, (req,res) => {
    res.render('stories/add')
})
module.exports = router