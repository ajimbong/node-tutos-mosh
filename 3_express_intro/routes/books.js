const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send('These are all the books in the land');
})

router.get('/:id', (req, res) => {
    res.send(req.params.id)
})

module.exports = router;