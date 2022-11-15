import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';

function VideoDetailPage(props) {


    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])

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

    }, [])


    if (Video.writer) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>

                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                                title={Video.title}
                                description={Video.description}
                            />
                            <div></div>
                        </List.Item>

                    </div>
                </Col>
                <Col lg={6} xs={24}>

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