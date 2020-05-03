import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useTranslate } from 'react-admin';
import { stringify } from 'query-string';

import paintings from '../paintings';


const useStyles = makeStyles({
    icon: { paddingRight: '0.5em' },
    link: {
        display: 'inline-flex',
        alignItems: 'center',
    },
});

const LinkToRelatedPaintings = ({ record }) => {
    const translate = useTranslate();
    const classes = useStyles();
    return record ? (
        <Button
            size="small"
            color="primary"
            component={Link}
            to={{
                pathname: '/paintings',
                search: stringify({
                    page: 1,
                    perPage: 25,
                    sort: 'id',
                    order: 'DESC',
                    filter: JSON.stringify({ artistId: record.id }),
                }),
            }}
            className={classes.link}
        >
            <paintings.icon className={classes.icon} /> 
            图片
        </Button>
    ) : null;
};

export default LinkToRelatedPaintings;
