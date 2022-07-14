const express = require('express')
const router = express.Router()
const {getPrivateData, getProfile} = require('../controllers/private')
const {protect} = require('../middleware/protect')
const {deleteUser, updateUser} = require("../controllers/auth")

router.get('/' ,protect,getPrivateData)
router.get('/profile/:email',protect, getProfile)
router.delete('/profile/:email',protect,deleteUser)
router.put('/profile/:email',protect, updateUser)

module.exports = router