import React, { useState } from 'react'
import { Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
                    console.log(response.data.result)
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

export default Comments