var express = require('express');
var router = express.Router();
const postDomain = require('../../Domain/Post_Domain')

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

class postcrud {

    static async all(req, res) {
        const domain = new postDomain();
        domain.all(req, res)
    }

    static async insert(req, res) {
        const domain = new postDomain();
        domain.insert(req, res)
    }

    static async getbyid(req, res) {
        const domain = new postDomain();
        domain.getbyid(req, res)
    }

    static async update(req, res) {
        const domain = new postDomain();
        domain.update(req, res)
    }

    static async postdelete(req, res) {
        const domain = new postDomain();
        domain.postdelete(req, res)
    }

    static async comment(req, res) {
        const domain = new postDomain();
        domain.comment(req, res)
    }

    static async like(req, res) {
        const domain = new postDomain();
        domain.like(req, res)
    }

    static async unlike(req, res) {
        const domain = new postDomain();
        domain.unlike(req, res)
    }

    static async mypost(req, res) {
        const domain = new postDomain();
        domain.mypost(req, res)
    }

    static async cmntdelete(req, res) {
        const domain = new postDomain();
        domain.cmntdelete(req, res)
    }

}

router.get('/', postcrud.all)
router.post('/createpost', upload.single('pic'), postcrud.insert)
router.get('/mypost/:id', postcrud.mypost)

router.put('/addcomment', postcrud.comment)
router.put('/like', postcrud.like)
router.put('/unlike', postcrud.unlike)


router.get('/:id', postcrud.getbyid)
router.put('/:id', postcrud.update)
router.delete('/:id', postcrud.postdelete)
router.delete('/comment/:id', postcrud.cmntdelete)

module.exports = router