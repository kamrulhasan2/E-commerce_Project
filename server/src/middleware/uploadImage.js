const multer = require('multer');
const path = require('path');
const { uploadUserImgPath, imgFileExtention, imgMaxFileSize } = require('../secret');
const createHttpError = require('http-errors');


const uploadDir = uploadUserImgPath;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const extName = path.extname(file.originalname);

    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + extName);
    }
  });

  const filerFile = (req,file,cb)=>{
    const extName = path.extname(file.originalname);
    if(!imgFileExtention.includes(extName.substring(1))){
        return cb(createHttpError(400,'File type not allowed'));
    }
    cb(null,true);
  };
  
  const upload = multer({ 
    storage: storage,
    limits : {fileSize: imgMaxFileSize},
    fileFilter : filerFile
 });

  module.exports = upload;