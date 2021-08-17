import axios from './axios';
import React, { useState } from 'react';
import "./chatInput.css";
import { useStateValue } from './stateProvider';

function ChatInput({ channelName, channelId }) {
    const [input, setInput] = useState("");
    const [{ user }] = useStateValue();

    const sendMessage = (e) => {
        e.preventDefault();

        if (channelId) {
            axios.post(`/new/message?id=${channelId}`, {
                message: input,
                timestamp: Date.now(),
                user: user.displayName,
                userImage: user.photoURL
            });
        }
        setInput("");
    };
    return (
        <div className="chatInput">
            <form>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message #${channelName?.toLowerCase()}`}
                />
                <button type="submit" onClick={sendMessage}>SEND</button>
            </form>
        </div>
    )
}

export default ChatInput;