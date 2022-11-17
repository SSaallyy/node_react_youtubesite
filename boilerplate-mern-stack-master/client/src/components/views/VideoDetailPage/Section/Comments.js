import React, { useState } from 'react'
import { Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

const { TextArea } = Input;

function Comments(props) {

    const user = useSelector(state => state.user);
    const [CommentsValue,setCommentsValue] = useState("")

    const onSubmit = (evt) => {
        evt.preventDefault();

        const variables = {
            content: CommentsValue,
            writer: user.userData._id, //리덕스로 가져오기
            postId: props.postId
        }

        axios.post('/api/comments/saveComment',variables)
             .then(response => {
                if(response.data.success){
                    setCommentsValue("")
                    props.refreshFunction(response.data.result)
                }else{
                    alert("댓글을 등록하지 못했습니다.")
                }
             })
    }

    const handleClick = (evt) => {
        setCommentsValue(evt.target.value)
    }

    return (
        <div>
            <br />
            <p> replies</p>
            <hr />
            {/* Comment Lists  */}
                {props.commentlists && props.commentlists.map((comment, index) => (
                    (!comment.responseTo &&
                        // jsx를 사용하기 때문에 div나 React.Fragment로 감싸줘야지 오류가 안남
                        <React.Fragment> 
                            <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                            <ReplyComment parentCommentId={comment._id} postId={props.postId} commentlists={props.commentlists}  refreshFunction={props.refreshFunction}/>
                       </React.Fragment>
                    )
                ))}
                {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={CommentsValue}
                    placeholder="댓글을 작성해주세요"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >Submit</Button>
            </form>

        </div>
    )
}

export default Comments;