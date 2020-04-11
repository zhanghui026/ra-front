import React from 'react';
import { ReferenceField, TextField } from 'react-admin';

const ProductReferenceField = props => (
    <ReferenceField
        label="Product"
        source="productId"
        reference="products"
        {...props}
    >
        <TextField source="reference" />
    </ReferenceField>
);

ProductReferenceField.defaultProps = {
    source: 'productId',
    addLabel: true,
};

export default ProductReferenceField;
