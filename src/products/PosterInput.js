import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useInput } from 'ra-core';

const useStyles = makeStyles({
    root: { display: 'inline-block', marginTop: '1em', zIndex: 2 },
    content: { padding: 0, '&:last-child': { padding: 0 } },
    img: {
        width: 'initial',
        minWidth: 'initial',
        maxWidth: '42em',
        maxHeight: '15em',
    },
    showMe: {
        position: 'absolute',
        top: '5px',
        right: '5px'
    },
    input: {
        display: 'none'
    }

});

const PosterInput = props => {
    const classes = useStyles();

    


}