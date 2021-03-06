import React from 'react';
import {
    Create,
    DateInput,
    SimpleForm,
    TextInput,
    useTranslate,
    PasswordInput,
    required,
} from 'react-admin';
import { styles } from '../products/ProductCreate copy';
import { Typography, Box } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';


const myStyles = {
    first_name: { display: 'inline-block' },
    last_name: { display: 'inline-block', marginLeft: 32 },
    email: { width: 544 },
    address: { maxWidth: 544 },
    zipcode: { display: 'inline-block' },
    city: { display: 'inline-block', marginLeft: 32 },
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    password: { display: 'inline-block' },
    confirmPassword: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(myStyles);

export const validatePasswords = ({
    password,
    confirmPassword
}) => {
    const errors = {};

    if (password && confirmPassword && password !== confirmPassword) {
        errors.confirmPassword = ['resources.customers.errors.password_mismatch',];
    }

    return errors;

};


const VisitorCreate = (props) => {
    const classes = useStyles();


    return (
       <Create {...props}>
            <SimpleForm validate={validatePasswords}>
                <SectionTitle label="resources.customers.fieldGroups.identity" />
                <TextInput
                    autoFocus
                    source="firstName"
                    formClassName={classes.first_name}
                    validate={requiredValidate}
                />
                <TextInput
                    source="lastName"
                    formClassName={classes.last_name}
                    validate={requiredValidate}
                />
                <TextInput
                    type="email"
                    source="email"
                    validation={{ email: true }}
                    fullWidth={true}
                    formClassName={classes.email}
                    validate={requiredValidate}
                />
                <DateInput source="birthday" />
                <Separator />
                <SectionTitle label="resources.customers.fieldGroups.address" />
                <TextInput
                    source="address"
                    formClassName={classes.address}
                    multiline={true}
                    fullWidth={true}
                />
                <TextInput source="zipcode" formClassName={classes.zipcode} />
                <TextInput source="city" formClassName={classes.city} />
                <Separator />
                <SectionTitle label="resources.customers.fieldGroups.password" />
                <PasswordInput
                    source="password"
                    formClassName={classes.password}
                />
                <PasswordInput
                    source="confirmPassword"
                    formClassName={classes.confirmPassword}
                />
            </SimpleForm>
        </Create>
    );
};

const requiredValidate = [required()];

const SectionTitle = ({ label }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(label)}
        </Typography>
    );
};
const Separator = () => <Box pt="1em" />;


export default VisitorCreate;
