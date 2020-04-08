import React from 'react'
import {
    DateInput,
    Edit,
    NullableBooleanInput,
    TextInput,
    PasswordInput,
    Toolbar,
    useTranslate,
    FormWithRedirect,
} from 'react-admin';
import { Box, Card, CardContent, Typography } from '@material-ui/core';

import FullNameField from './FullNameField';
import { validatePasswords } from './VisitorCreate';

const VistorEdit = (props) => {
    return (
        <Edit
        title={<VisitorTitle />}
        // aside={<Aside />}
        component="div"
        {...props}
    >
        <VisitorForm />
    </Edit>
    )
};


const VisitorTitle = ({ record }) => {
    return record ? <FullNameField record = {record} size = "32" /> : null;
}


const VisitorForm = ( props ) => {
    
    const translate = useTranslate();

    return (
        <FormWithRedirect {...props} validate={validatePasswords} 
            render = {(formProps) => {
              return (<Card>
                <form>
                    <CardContent>
                        <Box display={{ md: 'block', lg: 'flex' }}>
                            <Box flex={2} mr={{ md: 0, lg: '1em' }}>
                                <Typography variant="h6" gutterBottom>
                                    {translate(
                                        'resources.customers.fieldGroups.identity'
                                    )}
                                </Typography>
                                <Box display={{ xs: 'block', sm: 'flex' }}>
                                    <Box
                                        flex={1}
                                        mr={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <TextInput
                                            source="firstName"
                                            resource="customers"
                                            fullWidth
                                        />
                                    </Box>
                                    <Box
                                        flex={1}
                                        ml={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <TextInput
                                            source="lastName"
                                            resource="customers"
                                            fullWidth
                                        />
                                    </Box>
                                </Box>
                                <TextInput
                                    type="email"
                                    source="email"
                                    resource="customers"
                                    validation={{ email: true }}
                                    fullWidth
                                />
                                <Box display={{ xs: 'block', sm: 'flex' }}>
                                    <Box
                                        flex={1}
                                        mr={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <DateInput
                                            source="birthday"
                                            resource="customers"
                                            fullWidth
                                        />
                                    </Box>
                                    <Box
                                        flex={2}
                                        ml={{ xs: 0, sm: '0.5em' }}
                                    />
                                </Box>

                                <Box mt="1em" />

                                <Typography variant="h6" gutterBottom>
                                    {translate(
                                        'resources.customers.fieldGroups.address'
                                    )}
                                </Typography>
                                <TextInput
                                    source="address"
                                    resource="customers"
                                    multiline
                                    fullWidth
                                />
                                <Box display={{ xs: 'block', sm: 'flex' }}>
                                    <Box
                                        flex={1}
                                        mr={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <TextInput
                                            source="zipcode"
                                            resource="customers"
                                            fullWidth
                                        />
                                    </Box>
                                    <Box
                                        flex={2}
                                        ml={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <TextInput
                                            source="city"
                                            resource="customers"
                                            fullWidth
                                        />
                                    </Box>
                                </Box>

                                <Box mt="1em" />

                                <Typography variant="h6" gutterBottom>
                                    {translate(
                                        'resources.customers.fieldGroups.change_password'
                                    )}
                                </Typography>
                                <Box display={{ xs: 'block', sm: 'flex' }}>
                                    <Box
                                        flex={1}
                                        mr={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <PasswordInput
                                            source="password"
                                            resource="customers"
                                            fullWidth
                                        />
                                    </Box>
                                    <Box
                                        flex={1}
                                        ml={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <PasswordInput
                                            source="confirmPassword"
                                            resource="customers"
                                            fullWidth
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                flex={1}
                                ml={{ xs: 0, lg: '1em' }}
                                mt={{ xs: '1em', lg: 0 }}
                            >
                                <Typography variant="h6" gutterBottom>
                                    {translate(
                                        'resources.customers.fieldGroups.stats'
                                    )}
                                </Typography>
                                {/* <div>
                                    <SegmentsInput fullWidth />
                                </div> */}
                                <div>
                                    <NullableBooleanInput
                                        source="hasNewsletter"
                                        resource="customers"
                                    />
                                </div>
                            </Box>
                        </Box>
                    </CardContent>
                    <Toolbar
                        record={formProps.record}
                        basePath={formProps.basePath}
                        undoable={true}
                        invalid={formProps.invalid}
                        handleSubmit={formProps.handleSubmit}
                        saving={formProps.saving}
                        resource="customers"
                    />
                </form>
            </Card>)
            }

            }

        >



        </FormWithRedirect>

    );


}





export default VistorEdit;