const express = require('express');
const router = express.Router();
const multer = require('multer');

var ffmpeg = require('fluent-ffmpeg');

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
            return cb(res.status(400).end('only mp4 is allowed'), false);
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
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename})
    });
});

router.post('/thumbnail', (req,res)=>{

    let thumbsFilePath ="";
    let fileDuration ="";

   ffmpeg.setFfmpegPath("C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe");

   ffmpeg.ffprobe(req.body.filePath, function(err, metadata){
    console.dir(metadata);
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
})


ffmpeg(req.body.filePath)
    .on('filenames', function (filenames) {
        console.log('Will generate ' + filenames.join(', '))
        thumbsFilePath = "uploads/thumbnails/" + filenames[0];
    })
    .on('end', function () {
        console.log('Screenshots taken');
        return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
    })
    .screenshots({
        // Will take screens at 20%, 40%, 60% and 80% of the video
        count: 3,
        folder: 'uploads/thumbnails',
        size:'320x240',
        // %b input basename ( filename w/o extension )
        filename:'thumbnail-%b.png'
    });

});


module.exports = router;