import React from 'react';
import {
    Filter,
    List,
    Pagination,
    ReferenceInput,
    SearchInput,
    SelectInput,
    useTranslate,
} from 'react-admin';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import GridList from './GridList';

const useQuickFilterStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(3),
    },
}));

const QuickFilter = ({ label }) => {
    const translate = useTranslate();
    const classes = useQuickFilterStyles();
    return <Chip className={classes.root} label={translate(label)} />;
};

export const PaintingFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <ReferenceInput
            source="artistId"
            reference="artists"
            sort={{ field: 'id', order: 'ASC' }}
            perPage = {1000}
            label = {"画家"} 
        >
            <SelectInput source="name" label={"画家"}/>
        </ReferenceInput>
       
    </Filter>
);

const PaintingList = props => (
    <List
        {...props}
        filters={<PaintingFilter />}
        perPage={20}
        pagination={<Pagination rowsPerPageOptions={[10, 20, 40]} />}
        sort={{ field: 'id', order: 'ASC' }}
    >
        <GridList />
    </List>
);

export default PaintingList;
