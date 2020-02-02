import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { googleData } from '../../utils/oauth';

export default class Google extends Component {
    responseGoogle = (response) => {
        this.props.dispatch({ type: "GET_GOOGLE_OAUTH", payload: googleData(response) })
        console.log(response);
    }

    render() {
        return (
            <GoogleLogin
                clientId="689581593151-21gj0jbsojnt6rt4dfg20l7qogb333me.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
            />
        )
    }
}