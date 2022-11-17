
import React, { useEffect, useState } from 'react'
import { Tooltip } from 'antd';
import Icon from '@ant-design/icons';
import axios from 'axios';

function LikeDislikes(props) {

    const [Likes,setLikes] = useState(0)
    const [Dislikes,setDislikes] = useState(0)
    const [LikeAction,setLikeAction] = useState(null)
    const [DislikeAction,setDislikeAction] = useState(null)
    
    let variable = {}

    if(props.video){
        variable = { videoId: props.videoId,userId:props.userId }
    }else{
        variable = { commentId: props.commentId, userId:props.userId }
    }

    useEffect(()=>{
  
        axios.post('/api/like/getLikes',variable)
             .then(response => {
                if(response.data.success){
                    console.log(response.data.likes)

                    //좋아요 갯수
                    setLikes(response.data.likes.length)

                    //로그인한 사용자가 좋아요를 눌렀는지
                    response.data.likes.map((like)=>{
                        if(like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                }else{
                    alert('좋아요 정보를 가져오지 못했습니다.')
                }
             })

             axios.post('/api/like/getDislikes',variable)
             .then(response => {
                if(response.data.success){
                    console.log(response.data.dislikes)

                    //싫어요 갯수
                    setDislikes(response.data.dislikes.length)

                    //로그인한 사용자가 좋아요를 눌렀는지
                    response.data.dislikes.map((dislike)=>{
                        if(dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })
                }else{
                    alert('싫어요 정보를 가져오지 못했습니다.')
                }
             })

    },[])

    const onLike = () => {

        if(LikeAction === null) {

            axios.post('/api/like/upLike',variable)
                 .then(response=> {
                    if(response.data.success){
                        
                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        if(DislikeAction !== null){
                            setDislikeAction(null)
                            setDislikes(Dislikes-1)
                        }

                    }else{
                        alert('좋아요 실패')
                    }
                 })
        }else{
            axios.post('/api/like/unLike',variable)
                 .then(response=> {
                    if(response.data.success){

                        setLikes(Likes - 1)
                        setLikeAction(null)
                    }else{
                        alert('좋아요 취소 실패')
                    }
                 })
        }
    }


    const onDislike = () => {

        if(DislikeAction === null) {

            axios.post('/api/like/upDisLike',variable)
                 .then(response=> {
                    if(response.data.success){
                        
                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')

                        if(LikeAction !== null){
                            setLikeAction(null)
                            setLikes(Likes-1)
                        }

                    }else{
                        alert('싫어요 실패')
                    }
                 })
        }else{
            axios.post('/api/like/unDislike',variable)
                 .then(response=> {
                    if(response.data.success){

                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)
                    }else{
                        alert('싫어요 취소 실패')
                    }
                 })
        }
    }

    return (
        <React.Fragment>
        <span key="comment-basic-like">
            <Tooltip title="Like">
                <Icon type="like"
                    theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                    onClick={onLike} />
            </Tooltip>
            <span style={{ paddingLeft: '8px', cursor: 'auto' }} onClick={onLike} >{Likes}좋아요</span>
        </span>&nbsp;&nbsp;
        <span key="comment-basic-dislike">
            <Tooltip title="Dislike">
                <Icon
                    type="dislike"
                    theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                    onClick={onDislike} 
                />
            </Tooltip>
            <span style={{ paddingLeft: '8px', cursor: 'auto' }} onClick={onDislike} >{Dislikes}싫어요</span>
        </span>
    </React.Fragment>
    );
}

export default LikeDislikes;