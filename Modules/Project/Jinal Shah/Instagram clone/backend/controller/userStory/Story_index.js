var express = require('express');
var router = express.Router();
const storyDomain = require('../../Domain/Story_Domain')

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

class storycrud {

   static async all(req, res) {
      const domain = new storyDomain();
      domain.all(req, res)
   }

   static async insert(req, res) {
      const domain = new storyDomain();
      domain.insert(req, res)
   }

   static async delete(req, res) {
      const domain = new storyDomain();
      domain.delete(req, res)
   }



}

router.get('/', storycrud.all)
router.post('/createstory', upload.single('photo'), storycrud.insert)
router.delete('/:id', storycrud.delete)

module.exports = router