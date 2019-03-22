const router = require('express').Router()
const { chapter } = require('../handlers')

router.route('/:chapterId').get(chapter.getJsonResponse)

module.exports = router
