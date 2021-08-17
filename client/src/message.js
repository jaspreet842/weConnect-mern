import React from 'react';
import './message.css';

function Message({ message, timeStamp, user, userImage }) {
    return (
        <div className="message">
            <img src={userImage} alt="Profile" />
            <div className="messageInfo">
                <h4>
                    {user}
                    <span className="messageTimeStamp">
                        {new Date(parseInt(timeStamp)).toUTCString()}
                    </span>
                </h4>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Message;