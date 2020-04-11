import React from 'react';
import { ReferenceField } from 'react-admin';

import FullNameField from './FullNameField'

const CustomerReferenceField = (props) => {
    return (
        <ReferenceField source="customerId" reference ="customers" {...props} >
            <FullNameField />
        </ReferenceField>
    )
}

CustomerReferenceField.defaultProps = {
    source: 'customerId',
    addLable: true
};

export default CustomerReferenceField