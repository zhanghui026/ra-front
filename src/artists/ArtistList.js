import React from 'react';
import {
    BooleanField,
    Datagrid,
    DateField,
    DateInput,
    Filter,
    List,
    NullableBooleanInput,
    NumberField,
    SearchInput,
    TextField,
    EditButton,
} from 'react-admin';
import { makeStyles } from '@material-ui/core';
import ArtistLinkField from './ArtistLinkField'


import LinkToRelatedPaintings from './LinkToRelatedPaintings';

const useStyles = makeStyles({
    nbCommands: { color: 'purple' },
});

const ArtistList = (props) => {
    const classes = useStyles();
    return (
        <List
            {...props}
            sort={{ field: 'id', order: 'DESC' }}
            perPage={25}
        >
            { (
                <Datagrid optimized >
                    <ArtistLinkField />
                    <TextField label="国籍" source="citizenship" /> 
                    <TextField label="年代" source="bornAge" /> 
                    <TextField label="简介" source="sentence" /> 
                    <LinkToRelatedPaintings />
                    <EditButton /> 

                </Datagrid>
            )}
        </List>
    );
};

export default ArtistList;
