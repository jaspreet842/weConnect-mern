import React from 'react';
import './header.css';
import { Avatar } from '@material-ui/core';
import { AccessTime, HelpOutline, Search } from '@material-ui/icons';
import { useStateValue } from './stateProvider';

function Header() {
    const [{ user }] = useStateValue();
    return (
        <div className="header">
            <div className="headerLeft">
                <Avatar classname="headerAvatar" alt={user?.displayname} src={user?.photoURL} />
                <AccessTime />
            </div>
            <div className="headerSearch">
                <Search />
                <input placeholder="Search weConnect" />
            </div>
            <div className="headerRight">
                <HelpOutline />
            </div>
        </div>
    );
}

export default Header;