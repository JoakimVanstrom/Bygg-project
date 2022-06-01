const {Router} = require('express')
const ImageController = require('../controllers/ImgController')
const fileUpload = require('express-fileupload')
const Auth = require('../middlewares/auth')
const router = new Router()

router.post('/', fileUpload({useTempFiles:true}), ImageController.upload)
router.get('/', Auth.user, ImageController.getAll)

module.exports = router