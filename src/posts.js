import React from 'react';
import { Filter,List, Datagrid, ReferenceField, TextField, ShowButton,EditButton, Edit,Create, SimpleForm, ReferenceInput, SelectInput, TextInput } from 'react-admin'


const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label = "Search" source="title" alwaysOn/>
        <TextInput label = "Search" source="body"/>
        {/* <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name"></SelectInput>
        </ReferenceInput> */}

    </Filter>
);

export const PostList = props => (
    <List filters={<PostFilter />} {...props}>
        <Datagrid>
            <TextField source="id" />
            {/* <TextField source="userId" /> */}
            <ReferenceField source="userId" reference="clients"><TextField source="name" /></ReferenceField>
            <TextField source="title" />
            {/* <TextField source="body" /o> */}
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);

const PostTitle = ({ record }) => {
    return <span>Post {record? `"${record.title}"` : ''}</span> 
};


export const PostEdit = props => (
    <Edit title={<PostTitle></PostTitle>} {...props}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <ReferenceInput source="userId" reference="clients">
                <SelectInput optionText="name" />
            </ReferenceInput> 
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Edit>
)



export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="clients">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Create>
)