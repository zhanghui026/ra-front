import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    DateField,
    ReferenceField,
    NumberField,
    Filter,
    DateInput,
} from 'react-admin';

import FullNameField from '../visitors/FullNameField';
import AddressField from '../visitors/AddressField';
import InvoiceShow from './InvoiceShow';

const ListFilters = (props) => (
    <Filter {...props}>
        <DateInput source="date_gte" alwaysOn />
        <DateInput source="date_lte" alwaysOn />
    </Filter>
);

const InvoiceList = (props) => (
    <List {...props} filters={<ListFilters />} perPage={25}>
        <Datagrid rowClick="expand" expand={<InvoiceShow />}>
        {/* <Datagrid rowClick="expand"> */}
            <TextField source="id" />
            <DateField source="date" />
            <ReferenceField source="customerId" reference="customers">
                <FullNameField />
            </ReferenceField>
            <ReferenceField
                source="customerId"
                reference="customers"
                link={false}
                label="resources.invoices.fields.address"
            >
                <AddressField />
            </ReferenceField>
            <ReferenceField source="commandId" reference="commands">
                <TextField source="reference" />
            </ReferenceField>
            <NumberField source="totalExTaxes" />
            <NumberField source="deliveryFees" />
            <NumberField source="taxes" />
            <NumberField source="total" />
        </Datagrid>
    </List>
);

export default InvoiceList;
