const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '/uploads/'));
    },
    filename: function (req, file, cb) {
 
      cb(null,  Date.now() + '-' + file.originalname )
    }
  })
const uploadSingle = (file) => multer({ storage: storage }).single(file)
const uploadMulti  = multer({ 
  storage: storage,
}).fields([
  { name: 'mainImage', maxCount: 1 }, 
  { name: 'detailImages', maxCount: 3 } 
]);



  module.exports = {uploadSingle,uploadMulti}