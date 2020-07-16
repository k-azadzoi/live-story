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

// Process add form
// route POST /stories
router.post('/', authUser, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')

    }
    catch(err) {
        console.error(err)
        res.render('error/404')
    }
})

// Retrieve all stories
// route GET /stories

router.get('/', authUser, async (req,res) => {
    try {
        const stories = await Story.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('stories/index', {
            stories,
        })
    } catch (error) {
        console.error(error)
        res.render('error/404')
    }
})

module.exports = router