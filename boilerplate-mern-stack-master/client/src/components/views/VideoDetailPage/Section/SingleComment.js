import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

function SingleComment(props) {

    const user = useSelector(state => state.user);
    const [OpenReply,setOpenReply] = useState(false)
    const [CommentsValue,setCommentsValue] = useState("")

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const handleClick = (evt) => {
        //target : 부모로부터 이벤트가 위임된 자식을 반환
        //currentTarget : 이벤트 핸들러 부착된 요소 반환
        setCommentsValue(evt.currentTarget.value)
    }

    const onSubmit = (evt) => {
        evt.preventDefault();

       
        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentsValue
        }

        axios.post('/api/comments/saveComment',variables)
            .then(response => {
                if (response.data.success) {
                    setCommentsValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
        })

    }

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]

    return (
        <div>
        <Comment
            actions={actions}
            author={props.comment.writer.name}
            avatar={
                <Avatar
                    src={props.comment.writer.image}
                    alt="image"
                />
            }
            content={
                <p>
                    {props.comment.content} 
                </p>
            }
        ></Comment>
    {OpenReply &&
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={CommentsValue}
                    placeholder="write some comments"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>

    }
    </div>

    );
}

export default SingleComment;