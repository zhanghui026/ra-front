import React, { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const MyLoginPage = ({ theme }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();
    const submit = (e) => {
        e.preventDefault();
        login({ username, password })
            .catch(() => notify('Invalid username or password'));
    };

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={submit}>
                username:<input name="username" type="username" value={username} onChange={e => setUsername(e.target.value)} /> 
                password:<input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    fullWidth
                                > 登陆</Button>
            </form>
            <Notification />
        </ThemeProvider>
    );
};

export default MyLoginPage;