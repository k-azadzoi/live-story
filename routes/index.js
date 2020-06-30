// Homepage route

const express = require('express')
const router = express.Router()

//Setting up Routes

// Login/Landing Page
// route GET /
router.get('/', (req,res) => {
    res.render('login')
})

// Dashboard 
// route GET /dashboard
router.get('/dashboard', (req,res) => {
    res.render('dashboard')
})

module.exports = router