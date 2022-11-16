import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Subscribe(props) {

const [SubscribeNumber,setSubscribeNumber] = useState(0);
const [Subscribed,setSubscribed] = useState(false);

    useEffect(()=>{

        let variable = {userTo:props.userTo}

        axios.post('/api/subscribe/subscribeNumber',variable)
             .then( response=>{
                if(response.data.success){
                    setSubscribeNumber(response.data.subscriber)
                }else{
                    alert('구독자 수 정보를 받아오지 못했습니다.')
                }
             })

             let subvariable = {userTo:props.userTo, userFrom: localStorage.getItem('userId')}
            
             axios.post('/api/subscribe/subscribed',subvariable)
                  .then(response=>{
                    if(response.data.success){
                        setSubscribed(response.data.subscribed) //true,false
                    }else{
                        alert('구독 정보 받기 실패 !!!')
                    }
                  })
    },[])

    const onSubscribe = () => {

        let subscribeVariable = {
            userTo : props.userTo,
            userFrom : props.userFrom
        }

        //이미 구독중일때
        if(Subscribed){

            axios.post('/api/subscribe/unSubscribed',subscribeVariable)
                 .then(response=>{
                    if(response.data.success){
                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed)
                    }else{
                        alert('구독해제 실패 !!!')
                    }
                 })

        }else{
            axios.post('/api/subscribe/subscribe',subscribeVariable)
            .then(response=>{
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber + 1)
                    setSubscribed(!Subscribed)
                }else{
                    alert('구독 실패 !!!')
                }
            })

        }

    }

    return (
        <div>
            <button style={{
                backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }} onClick={onSubscribe}>
               {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    );
}

export default Subscribe;