const router = require('express').Router()

const chapterRouter = require('./chapter.routes')

router.use('/chapter_versions', chapterRouter)

module.exports = router
