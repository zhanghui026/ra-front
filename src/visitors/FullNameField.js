import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AvatarField from './AvatarField';
import pure from 'recompose/pure';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
    },
    avatar: {
        marginRight: theme.spacing(1),
    },
}));


const FullNameField = ({record,size}) => {
    
    const classes = useStyles();
    return record ? (
        <div className={classes.root}>
            <AvatarField
                className={classes.avatar}
                record={record}
                size={size}
            />
            {record.firstName} {record.lastName}
        </div>
    ) : null;
};


const PureFullNameField = pure(FullNameField);

// PureFullNameField.propTypes = {
//     source : 'lastName',
//     label: 'resources.customers.fields.name',
// };


export default PureFullNameField;