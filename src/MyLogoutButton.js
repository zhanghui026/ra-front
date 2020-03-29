// in src/MyLogoutButton.js
import React, { forwardRef } from 'react';
import { useLogout } from 'react-admin';
import MenuItem from '@material-ui/core/MenuItem';
import ExitIcon from '@material-ui/icons/PowerSettingsNew';

const MyLogoutButton = forwardRef((props, ref) => {
    const logout = useLogout();
    const handleClick = () => {
        console.log('asss');
        logout('/login');
    }
    return (
        <MenuItem
            onClick={handleClick}
            ref={ref}
        >
            <ExitIcon /> 退出 
        </MenuItem>
    );
});

export default MyLogoutButton;