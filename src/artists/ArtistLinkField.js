import React, { PropTypes } from 'react';
import { Link } from 'react-admin';
import FullNameField from './FullNameField';

const ArtistLinkField = props => {
    return props.record ? (
        <Link to={`/artists/${props.record.id}`}>
            <FullNameField {...props} />
        </Link>
    ) : null;
}

ArtistLinkField.defaultProps = {
    source: 'artistId',
    addLabel: true,
    label: '名字'
}

export default ArtistLinkField