import { Button } from '@material-ui/core';
import React from 'react'
import { auth, provider } from './firbase';
import './login.css';
import { actiontypes } from './reducer';
import { useStateValue } from './stateProvider';

function Login() {
    const [state, dispatch] = useStateValue();
    const signIn = (e) => {
        auth.signInWithPopup(provider).then(result => {
            dispatch({
                type: actiontypes.SET_USER,
                user: result.user
            })
        }).catch((error)=>{
            alert(error.message);
        });
    };
    return (
        <div className="login">
            <div className="loginContainer">
                <img src="../favicon.ico" alt=""></img>
                <h1>Sign in to weConnect</h1>
                <p>weConnect.com</p>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    )
}

export default Login;
