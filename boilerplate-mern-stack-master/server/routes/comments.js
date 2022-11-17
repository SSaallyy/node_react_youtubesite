const express = require('express');
const router = express.Router();

const { Comments } = require("../models/Comments");
const { auth } = require("../middleware/auth");
//=================================
//             comments
//=================================

router.post("/saveComment", (req, res) => {
    
    const comment = new Comments(req.body)

    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err })

        //id에있는 모든 정보를 가져오기 위한 코드
        //comment에는 id만 들어있고 해당하는 정보가 들어있지 않기 때문에
        Comments.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })

});

router.post("/getComments", (req, res) => {

    Comments.find({ 'postId': req.body.videoId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })

});


module.exports = router;
