import React from 'react';
import {
    AutocompleteInput,
    DateInput,
    Filter,
    ReferenceInput,
    SearchInput,
    SelectInput,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useFilterStyles = makeStyles({
    status: { width: 150 },
});

const ReviewFilter = props => {
    const classes = useFilterStyles();
    return (
        <Filter {...props}>
            <SearchInput source="q" alwaysOn />
            <SelectInput
                source="status"
                choices={[
                    { id: 'accepted', name: 'Accepted' },
                    { id: 'pending', name: 'Pending' },
                    { id: 'rejected', name: 'Rejected' },
                ]}
                className={classes.status}
            />
            <ReferenceInput source="customerId" reference="customers" 
            // perPage={10000} sort={{field:'firstName',order:'ASC'}} 
            
            >
                <AutocompleteInput
                    optionText={choice =>
                        `${choice.firstName} ${choice.lastName}`
                    }
                />
            </ReferenceInput>
            <ReferenceInput source="productId" reference="products">
                <AutocompleteInput optionText="reference" />
            </ReferenceInput>
            <DateInput source="date_gte" />
            <DateInput source="date_lte" />
        </Filter>
    );
};

export default ReviewFilter;
