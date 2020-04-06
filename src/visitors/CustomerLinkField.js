import React, { PropTypes } from 'react';
import { Link } from 'react-admin';
import FullNameField from './FullNameField';

const CustomerLinkField = props => {
    return props.record ? (
        <Link to={`/customers/${props.record.id}`}>
            <FullNameField {...props} />
        </Link>
    ) : null;
}

CustomerLinkField.defaultProps = {
    source: 'customerId',
    addLabel: true,
    label: '名字'
}

export default CustomerLinkField