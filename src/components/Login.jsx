import React, { Component } from 'react';
import { TextField, Grid, Button } from '@material-ui/core';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super();
        this.state = {
            username: null,
            password: null,
            userError: false,
            passwordError: false
        }
    }

    updateFilledValue = (e, type) => {
        let value = e.target.value;
        switch (type) {
            case 'user':
                this.setState({ username: value });
                break;
            case 'password':
                this.setState({ password: value });
                break;
        }
    }

    validatepassword = () => {
        const { password } = this.state;
        if (
            password.length >= 6 &&
            password.length <= 12 &&
            this.lettercase('upper') &&
            this.lettercase('lower') &&
            this.special()
        ) {
            this.setState({
                passwordError: false
            })
            return true
        } else {
            this.setState({
                passwordError: true
            })
            return false
        }
    }

    validateUsername = () => {
        const { username } = this.state;
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(username)) {
            this.setState({
                userError: false
            })
            return true
        }
        else {
            this.setState({
                userError: true
            })
        }
    }

    login = () => {
        if (this.validateUsername() && this.validatepassword())
            this.validateUserData()
    }

    validateUserData = () => {
        const { username, password } = this.state;
        var self = this;
        axios({
            url: './users.json',
            method: 'GET'
        }).then(res => {
            let validuser = 0;
            res.data.map(item => {
                if(item.username == username && item.password == password){
                    validuser++
                    self.setlogin(true, item.username, item.fullname)
                }
                    
            })
            if(validuser == 0) {
                self.setlogin(false)
            }
        })
        
    }

    setlogin = (status, username, fullname) => {
        if(status){
            localStorage.setItem('username', username);
            localStorage.setItem('fullname', fullname);
        } else {
            localStorage.removeItem('username');
            localStorage.removeItem('fullname');
        }
    }

    lettercase = (lettercase) => {
        const { password } = this.state;
        let i = 0, character = '';
        let validation = 0;
        if (password) {

            switch (lettercase) {
                case 'upper': while (i < password.length && validation == 0) {
                    character = password[i];
                    if (character == character.toUpperCase()) {
                        validation++;
                        break;
                    }
                    i++;
                };
                    break;
                case 'lower': while (i < password.length && validation == 0) {
                    character = password[i];
                    if (character == character.toLowerCase()) {
                        validation++;
                        break;
                    }
                    i++;
                }
            }
        }
        debugger
        return validation != 0 ? true : false
    }

    special = () => {
        var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
        let a = format.test(this.state.password)
        debugger
        return a

    }

    render() {
        const { username, password, userError, passwordError } = this.state;
        return <Grid container>
            <Grid item xs={12}>
                <TextField
                    error={userError}
                    required
                    id="outlined-required"
                    type="email"
                    label="User name"
                    variant="outlined"
                    value={username}
                    onChange={(e) => this.updateFilledValue(e, 'user')}
                />

                <TextField
                    error={passwordError}
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => this.updateFilledValue(e, 'password')}
                />
                <Button variant="contained" color="primary" onClick={this.login}>
                    Login
                    </Button>
            </Grid>
        </Grid>
    }
}

export default Login