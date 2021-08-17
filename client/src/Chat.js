import React, { useState, useEffect } from 'react';
import "./chat.css";
import { useParams } from "react-router-dom";
import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons';
import Message from './message';
import ChatInput from './chatInput';
import axios from './axios';
import Pusher from 'pusher-js';

const pusher = new Pusher('c26bcddebb2bf667aed3', {
    cluster: 'ap2'
});

function Chat() {
    const { roomId } = useParams();
    const [roomDetails, setRoomDetails] = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);
    const getConversation = () => {
        axios.get(`/get/conversation?id=${roomId}`).then((res) => {
            setRoomDetails(res.data[0].channelName)
            setRoomMessages(res.data[0].conversation)
        })
    }
    useEffect(() => {
        if (roomId) {
            getConversation();
            const channel = pusher.subscribe('conversation');
            channel.bind('newMessage', function (data) {
                getConversation();
            });
        }
    }, [roomId])
    return (
        <div className="chat">
            <div className="chatHeader">
                <div className="chatHeaderLeft">
                    <h4 className="chatChannelName">
                        <strong>#{roomDetails}</strong>
                        <StarBorderOutlined />
                    </h4>
                </div>
                <div className="chatHeaderRight">
                    <p>
                        <InfoOutlined />Details
                    </p>
                </div>
            </div>
            <div className="chatMessages">
                {roomMessages.map(({ message, timestamp, user, userImage }) => (
                    <Message message={message} timeStamp={timestamp} user={user} userImage={userImage} />
                ))}
            </div>
            <ChatInput channelName={roomDetails} channelId={roomId} />
        </div>
    );
}

export default Chat;