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

// Show edit page
// route GET /stories/edit/:id
router.get('/edit/:id', authUser, async (req,res) => {
    try {
        const story = await Story.findOne({
            _id: req.params.id
        }).lean()
    
        if(!story){
            return res.render('error/404')
        }
    
        if(story.user != req.user.id) {
            res.redirect('/stories')
        } else {
            res.render('stories/edit', {
                story,
            })
        }
        
    } catch (error) {
        console.error(error)
        return res.render('error/404')
    }
    
})

// Update Story
// route PUT /stories/:id
router.put('/:id', authUser, async (req,res) => {

    try {
        let story = await Story.findById(req.params.id).lean()

        if (!story){
            return res.render('error/404')
        }

        if(story.user != req.user.id) {
            res.redirect('/stories')
        } else {
            story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true,  
            })
        }
        res.redirect('/dashboard')
        
    } catch (error) {
        console.error(error)
        return res.render('error/404')
    }
    
})

// Delete story
// route DELETE /stories/delete/:id
router.delete('/:id', authUser, async (req,res) => {
    try {
        await Story.remove({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error)
        return res.render('error/404')
    }
})


module.exports = router