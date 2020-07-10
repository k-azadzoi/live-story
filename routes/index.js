// Homepage Route
const express = require('express')
const router = express.Router()
const { authUser, authGuest } = require('../middleware/auth')

const Story = require('../models/Story')

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
router.get('/dashboard', authUser, async(req,res) => {
    try {
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        })

    } catch(err){
        console.error(err)
        res.render('error/404')
    }
})


module.exports = router