var express = require('express');
var router = express.Router();

const userAccount_Domain = require("../../Domain/userAccount_Domain")
const login = require('../Login/login')
const security = require('../../Authenticator/security')

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    /* filename : function(req,file,cb){
        cb(null, new Date().toISOString() + file.originalname);
    } */
    filename: function (req, file, cb) {

        if (!file.originalname.match(/\.(png|jpeg|jpg|wav|tif|gif)$/)) {
            var err = new Error();
            err.code = 'filetype';
            return cb(err);
        } else {
            cb(null, Date.now() + "_" + file.originalname);
        }
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

class userAccountController {

    static async getbyid(req, res) {
        const domain = new userAccount_Domain();
        domain.getbyid(req, res)
    }

    static async insert(req, res) {
        const domain = new userAccount_Domain();
        domain.insert(req, res)
    }

    static async update(req, res) {
        const domain = new userAccount_Domain();
        domain.update(req, res)
    }

    static async delete(req, res) {
        const domain = new userAccount_Domain();
        domain.delete(req, res)
    }

    static async follower(req, res) {
        const domain = new userAccount_Domain();
        domain.follower(req, res)
    }

    static async verify(req, res) {
        const domain = new userAccount_Domain();
        domain.verify(req, res)
    }

    static async updateProfilePic(req, res) {
        const domain = new userAccount_Domain();
        domain.updateProfilePic(req, res)
    }

    static async follow(req, res) {
        const domain = new userAccount_Domain();
        domain.follow(req, res)
    }

    static async unfollow(req, res) {
        const domain = new userAccount_Domain();
        domain.unfollow(req, res)
    }

    static async search(req, res) {
        const domain = new userAccount_Domain();
        domain.search(req, res)
    }

    static async getDetails(req, res) {
        const domain = new userAccount_Domain();
        domain.getDetails(req, res)
    }

}

router.post('/signup', userAccountController.insert)
router.get('/signup/verify/:id', userAccountController.verify)
router.use('/signin', login)

router.use(security)

router.post('/searchusers', userAccountController.search)

router.put('/updateprofilepic', upload.single('profilePic'), userAccountController.updateProfilePic)

router.put('/follow', userAccountController.follow)
router.put('/unfollow', userAccountController.unfollow)


router.get('/:id', userAccountController.getbyid)
router.get('/details/:id', userAccountController.getDetails)

router.put('/:id', userAccountController.update)
router.delete('/:id', userAccountController.delete)

module.exports = router