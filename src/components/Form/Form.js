import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Typography, TextField, Grid, Paper, Button } from '@material-ui/core';
import { login, register } from "../../actions/form";
import { toast } from 'react-toastify';
import Google from '../GoogleOauth';

class Form extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate() {
        console.log('componentDidUpdate', this.props)
        const { auth: { status }, history } = this.props;
        if (status === "success")
            history.push('/dashboard')
    }

    onSubmit() {
        console.log('onSubmit', this.email.value, this.password.value);
        const { type, dispatch } = this.props;
        if (type === "login")
            dispatch({ type: "LOGIN_USER", payload: { email: this.email.value, password: this.password.value } })
        else if (type === "register")
            dispatch({ type: "REGISTER_USER", payload: { name: this.name.value, email: this.email.value, password: this.password.value } })
    }

    componentWillUpdate(prevProps) {
        if (prevProps.auth.googleOauth !== this.props.auth.googleOauth || prevProps.auth.data !== this.props.auth.data)
            toast.success("Success Notification !", {
                position: toast.POSITION.TOP_CENTER
            });
    }

    render() {
        const { type, dispatch } = this.props;
        return (
            <Grid className="login-container" item xs={12} sm={8} md={6} lg={6}>
                <Paper className="login">
                    {/* {auth.status === "failed" && <Alert severity="error">Login Failed</Alert>}
                    {auth.status === "success" && <Alert severity="success">Login Success</Alert>} */}
                    <Typography color="textSecondary" align="center" variant="h6">
                        {type === "login" ? "Login" : "Register"}
                    </Typography>
                    {type === "register" && <TextField md={12} className="userName" label="User Name" inputRef={el => this.name = el} variant="outlined" />}
                    <TextField md={12} className="email" label="Email" inputRef={el => this.email = el} variant="outlined" />
                    <TextField md={12} className="password" inputRef={el => this.password = el} type="password" label="Password" variant="outlined" />
                    <Grid className="button-container" container>
                        <Grid className="button-clear" item xs={6}>
                            <Button className="button" variant="outlined" color="primary" xs={6} >
                                Clear
                        </Button>
                        </Grid>
                        <Grid className="button-login" item xs={6}>
                            <Button className="button" variant="outlined" color="primary" xs={6} onClick={this.onSubmit}>
                                {type === "login" ? "Login" : "Register"}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid className="button-container" container>
                        <Grid className="button-clear" item xs={12}>
                            <Google {...this.props} />
                        </Grid>
                    </Grid>
                    <Typography className="form-type" color="textSecondary" align="right" variant="body1" onClick={type === "login" ? () => dispatch(register()) : () => dispatch(login())}>
                        {type === "login" ? "Register" : "Login"}
                    </Typography>
                </Paper>
            </Grid>
        )
    }
}

Form.propTypes = {
    type: PropTypes.string.isRequired
}

export default Form
