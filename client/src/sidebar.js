import React, { useState, useEffect } from 'react';
import './sidebar.css';
import SidebarOption from './sidebarOption';
import { Add, Apps, BookmarkBorder, Create, Drafts, ExpandLess, ExpandMore, FiberManualRecord, FileCopy, Inbox, InsertComment, PeopleAlt } from '@material-ui/icons'
import { useStateValue } from './stateProvider';
import axios from './axios';
import Pusher from 'pusher-js';

const pusher = new Pusher('c26bcddebb2bf667aed3', {
    cluster: 'ap2'
});

function Sidebar() {
    const [{ user }] = useStateValue();
    const [channels, setChannels] = useState([]);

    const getChannelList = () => {
        axios.get('/get/channelList').then((res) => {
            setChannels(res.data)
        })
    }
    useEffect(() => {
        getChannelList();
        const channel = pusher.subscribe('channels');
        channel.bind('newChannel', function (data) {
            getChannelList();
        });
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebarHeader">
                <div className="sidebarInfo">
                    <h2>weConnect</h2>
                    <h3>
                        <FiberManualRecord />
                        {user?.displayName}
                    </h3>
                </div>
                <Create />
            </div>
            <SidebarOption Icon={InsertComment} title="Threads" />
            <SidebarOption Icon={Inbox} title="Mentions & reactions" />
            <SidebarOption Icon={Drafts} title="Saved Items" />
            <SidebarOption Icon={BookmarkBorder} title="Channel browser" />
            <SidebarOption Icon={PeopleAlt} title="People & user groups" />
            <SidebarOption Icon={Apps} title="Apps" />
            <SidebarOption Icon={FileCopy} title="File browser" />
            <SidebarOption Icon={ExpandLess} title="Show less" />
            <hr />
            <SidebarOption Icon={ExpandMore} title="Channels" />
            <hr />
            <SidebarOption Icon={Add} addChannelOption title="Add Channel" />
            {channels.map(channel => (
                <SidebarOption title={channel.name} id={channel.id} />
            ))}
        </div>
    );
}

export default Sidebar;