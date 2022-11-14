const express = require('express');
const router = express.Router();
const multer = require('multer');

const { auth } = require("../middleware/auth");


var storage = multer.diskStorage({
    //파일 경로 지정
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    //저장할 파일 이름
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    //업로드 가능한 파일 확장자 지정
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

//파일은 하나만
const upload = multer({ storage: storage }).single("file");

//=================================
//             Video
//=================================

//index.js에서 이미 app.use('/api/video', require('./routes/Video')); 을 통해서 주소를 읽어오기 때문에
//'/uploadfiles'만 표기해도 됨
router.post('/uploadfiles', (req,res)=>{

    //클라이언트에서 받은 비디오를 서버에 저장
    upload(req,res,err=>{
        if(err){
            return res.json({ success : false,err})
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename})
    })

})

module.exports = router;