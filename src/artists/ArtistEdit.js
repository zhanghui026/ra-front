import React from 'react'
import {
    Edit,
    NullableBooleanInput,
    TextInput,
    PasswordInput,
    NumberField,
    Toolbar,
    useTranslate,
    FormWithRedirect,
    ReferenceManyField,
    Datagrid,
    EditButton,
    SimpleForm,
    TextField,
} from 'react-admin';

import RichTextInput from 'ra-input-rich-text';
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import ThumbnailField from '../paintings/ThumbnailField'
import FullNameField from './FullNameField';
import PaintingList from '../paintings/PaintingList';

const ArtistEdit = (props) => {
    return (
        <Edit
            title={<ArtistTitle />}
            // aside={<Aside />}
            // component="div"
            {...props}>
            {/* <ArtistForm /> */}
            {/* <PaintingForm /> */}
            <SimpleForm>
                <ReferenceManyField
                    label="作家"
                    reference="paintings"
                    target="artistId"
                >
                    <Datagrid>
                        <TextField source="name" />

                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </SimpleForm>
        </Edit>
    )
};


const ArtistTitle = ({ record }) => {
    return record ? <FullNameField record={record} size="32" /> : null;
}


const PaintingForm = (props) => {
    return (
        <ReferenceManyField
            reference="products"
            target="categoryId"
            label="resources.categories.fields.products"
            perPage={100}
        >
            <Datagrid>
                {/* <ThumbnailField /> */}
                <NumberField
                    source="price"
                    options={{ style: 'currency', currency: 'USD' }}
                />
                <NumberField
                    source="width"
                    options={{ minimumFractionDigits: 2 }}
                />
                <NumberField
                    source="height"
                    options={{ minimumFractionDigits: 2 }}
                />
                <NumberField source="stock" />
                <EditButton />
            </Datagrid>
        </ReferenceManyField>
        //     <SimpleForm>

        //     <ReferenceManyField
        //         label="作家"
        //         reference="paintings"
        //         target="artistId"
        //     >
        //         <Datagrid>
        //             <TextField source="name" />

        //             <EditButton />
        //         </Datagrid>
        //     </ReferenceManyField>
        // </SimpleForm>

    );


}

// const ArtistForm = ( props ) => {

//     const translate = useTranslate();

//     return (
//         <FormWithRedirect {...props} 
//             render = {(formProps) => {
//               return (<Card>
//                 <form>
//                     <CardContent>
//                         <Box display={{ md: 'block', lg: 'flex' }}>
//                             <Box flex={2} mr={{ md: 0, lg: '1em' }}>
//                                 <Typography variant="h6" gutterBottom>
//                                     {translate(
//                                         'resources.artists.fieldGroups.identity'
//                                     )}
//                                 </Typography>
//                                 <Box display={{ xs: 'block', sm: 'flex' }}>
//                                     <Box
//                                         flex={1}
//                                         mr={{ xs: 0, sm: '0.5em' }}
//                                     >
//                                         <TextInput
//                                             source="name"
//                                             label= "姓名"
//                                             resource="artists"
//                                             fullWidth
//                                         />
//                                     </Box>
//                                     <Box
//                                         flex={1}
//                                         ml={{ xs: 0, sm: '0.5em' }}
//                                     >
//                                         <TextInput
//                                             label="俄语名"
//                                             source="rsName"
//                                             resource="artists"
//                                             fullWidth
//                                         />
//                                     </Box>
//                                 </Box>

//                                 <Box display={{ xs: 'block', sm: 'flex' }}>
//                                     <Box
//                                         flex={1}
//                                         mr={{ xs: 0, sm: '0.5em' }}
//                                     >
//                                         <TextInput
//                                             source="enName"
//                                             label= "英文名"
//                                             resource="artists"
//                                             fullWidth
//                                         />
//                                     </Box>
//                                     <Box
//                                         flex={1}
//                                         ml={{ xs: 0, sm: '0.5em' }}
//                                     >
//                                          <TextInput
//                                     label= "国籍"
//                                     source="citizenship"
//                                     resource="artists"
//                                     fullWidth
//                                 />
//                                     </Box>
//                                 </Box>

//                                 <Box display={{ xs: 'block', sm: 'flex' }}>
//                                     <Box
//                                         flex={1}
//                                         mr={{ xs: 0, sm: '0.5em' }}
//                                     >
//                                         <TextInput
//                                             source="bornAge"
//                                             label="创作年代"
//                                             resource="artists"
//                                             fullWidth
//                                         />
//                                     </Box>
//                                     <Box
//                                         flex={2}
//                                         ml={{ xs: 0, sm: '0.5em' }}
//                                     />
//                                 </Box>

//                                 <Box mt="1em" />

//                                 <Typography variant="h6" gutterBottom>
//                                     {translate(
//                                         'resources.artists.fieldGroups.address'
//                                     )}
//                                 </Typography>
//                                 <TextInput
//                                     source="sentence"
//                                     label="荣誉"
//                                     resource="artists"
//                                     multiline
//                                     fullWidth
//                                 />


//                             <TextInput source="brief" label="简介" multiline resettable fullWidth />


//                             <RichTextInput source="info" label="详细信息"></RichTextInput>

//                             </Box>

//                         </Box>
//                     </CardContent>
//                     <Toolbar
//                         record={formProps.record}
//                         basePath={formProps.basePath}
//                         undoable={true}
//                         invalid={formProps.invalid}
//                         handleSubmit={formProps.handleSubmit}
//                         saving={formProps.saving}
//                         resource="artists"
//                     />
//                 </form>
//             </Card>)
//             }

//             }

//         >



//         </FormWithRedirect>

// );


// }





export default ArtistEdit;