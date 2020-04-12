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
} from 'react-admin';
import { makeStyles } from '@material-ui/core';


import SegmentsField from './SegmentsField';
// import SegmentInput from './SegmentInput';
import CustomerLinkField from './CustomerLinkField';
import ColoredNumberField from './ColoredNumberField';
// import MobileGrid from './MobileGrid';

const VisitorFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <DateInput source="lastSeen_gte" />
        <NullableBooleanInput source="hasOrdered" />
        <NullableBooleanInput source="hasNewsletter" defaultValue />
        {/* <SegmentInput /> */}
    </Filter>
);

const useStyles = makeStyles({
    nbCommands: { color: 'purple' },
});

const VisitorList = (props: any) => {
    const classes = useStyles();
    return (
        <List
            {...props}
            filters={<VisitorFilter />}
            sort={{ field: 'lastSeen', order: 'DESC' }}
            perPage={25}
        >
            { (
                <Datagrid optimized rowClick="edit">
                    <CustomerLinkField />
                    <DateField source="lastSeen" type="date" label="日期"/>
                    <NumberField
                        source="nbCommands"
                        label="resources.customers.fields.commands"
                        className={classes.nbCommands}
                    />
                    <ColoredNumberField
                        source="totalSpend"
                        options={{ style: 'currency', currency: 'USD' }}
                        
                    />
                    
                    <DateField source="latestPurchase" showTime />
                    <BooleanField source="hasNewsletter" label="News." />
                    <SegmentsField />
                </Datagrid>
            )}
        </List>
    );
};

export default VisitorList;
