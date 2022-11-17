import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import SideVideo from './Section/SideVideo';
import Subscribe from './Section/Subscribe';
import Comments from './Section/Comments';
import LikeDislikes from './Section/LikeDislikes';

function VideoDetailPage(props) {


    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])
    const [Commentlists,setCommentLists] = useState([])

    const videoVariable = {
        videoId: videoId
    }

    useEffect(() => {
        axios.post('/api/video/getVideoDetail', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.video)
                    setVideo(response.data.video)
                } else {
                    alert('비디오 정보 불러오기 실패')
                }
            })

        axios.post('/api/comments/getComments', videoVariable)
        .then(response => {
            if (response.data.success) {
                console.log('response.data.comments',response.data.comments)
                setCommentLists(response.data.comments)
            } else {
                alert('댓글정보 불러오기 실패')
            }
        })

    }, [])

    const updateComment = (newComment) => {
        setCommentLists(Commentlists.concat(newComment))
    }

    if (Video.writer) {

        const subscribeButton = Video.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={Video.writer._id} userFrom={localStorage.getItem('userId')} />

        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>

                        <List.Item
                            actions={[<LikeDislikes video videoId={videoId} userId={localStorage.getItem('userId')} />,subscribeButton]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                                title={Video.title}
                                description={Video.description}
                            />
                            <div></div>
                        </List.Item>
                        {/* comments */}
                        <Comments postId={videoId} commentlists={Commentlists} refreshFunction={updateComment}/>
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo/>
                </Col>
            </Row>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }


}

export default VideoDetailPage;