const express = require('express');
const router = express.Router();

const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");
//=================================
//           likedislike
//=================================

router.post("/getLikes", (req, res) => {

    let variable = {}

    //비디오
    if(req.body.videoId){
        variable = { videoId: req.body.videoId }
    }else{ //코맨트
        variable = { commentId: req.body.commentId }
    }


    Like.find(variable)
        .exec((err,likes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, likes })
        })
});

router.post("/getDislikes", (req, res) => {

    let variable = {}

    //비디오
    if(req.body.videoId){
        variable = { videoId: req.body.videoId }
    }else{ //코맨트
        variable = { commentId: req.body.commentId }
    }


    Dislike.find(variable)
        .exec((err,dislikes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, dislikes })
        })
});

router.post("/upLike", (req, res) => {

    let variable = {}

    if(req.body.videoId){
        variable = { videoId: req.body.videoId, userId: req.body.userId}
    }else{
        variable = { commentId: req.body.commentId, userId: req.body.userId}
    }

    //like collection에 클릭정보 넣기
    const like = new Like(variable)

    like.save((err,likeresult)=>{
        if(err) return res.json({ success: false, err})

        //만약에 Dislike이 이미 클릭이 되어있다면, dislike취소 
        Dislike.findOneAndDelete(variable)
                .exec((err,dislikeresult)=>{
                    if(err) return res.status(400).json({ success: false, err})
                    res.status(200).json({ success: true })
                })         
    })

});


router.post("/unLike", (req, res) => {

    let variable = {}

    if(req.body.videoId){
        variable = { videoId: req.body.videoId, userId: req.body.userId}
    }else{
        variable = { commentId: req.body.commentId, userId: req.body.userId}
    }

    Like.findOneAndDelete(variable)
        .exec((err,result)=>{
            if(err) return res.status(400).json({ success: false, err})
            res.status(200).json({ success: true })
        })
});


router.post("/upDisLike", (req, res) => {

    let variable = {}
    if(req.body.videoId){
        variable = { videoId: req.body.videoId, userId: req.body.userId}
    }else{
        variable = { commentId: req.body.commentId, userId: req.body.userId}
    }

    //dislike collection에 클릭정보 넣기
    const dislike = new Dislike(variable)

    dislike.save((err,likeresult)=>{
        if(err) return res.json({ success: false, err})

        //만약에 like이 이미 클릭이 되어있다면, like취소 
        Like.findOneAndDelete(variable)
                .exec((err,dislikeresult)=>{
                    if(err) return res.status(400).json({ success: false, err})
                    res.status(200).json({ success: true })
                })         
    })

});

router.post("/unDislike", (req, res) => {

    let variable = {}

    if(req.body.videoId){
        variable = { videoId: req.body.videoId, userId: req.body.userId}
    }else{
        variable = { commentId: req.body.commentId, userId: req.body.userId}
    }

    Dislike.findOneAndDelete(variable)
        .exec((err,result)=>{
            if(err) return res.status(400).json({ success: false, err})
            res.status(200).json({ success: true })
        })
});

module.exports = router;
