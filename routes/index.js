// Homepage Route

const express = require('express')
const router = express.Router()
const { authUser, authGuest } = require('../middleware/auth')

//Setting up Routes

// Login/Landing Page
// route GET /
router.get('/', authGuest, (req,res) => {
    res.render('login', {
        layout: 'login'
    })
})

// Dashboard 
// route GET /dashboard
router.get('/dashboard', authUser, (req,res) => {
    res.render('dashboard')
})

module.exports = router