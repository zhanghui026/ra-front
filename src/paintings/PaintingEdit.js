import React from 'react';
import {
    Edit,
    FormTab,
    NumberInput,
    ReferenceInput,
    AutocompleteInput,
    TabbedForm,
    TextInput,
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';

// import CustomerReferenceField from '../visitors/CustomerReferenceField';
import StarInputField from './StarInputField';
import Poster from './Poster';
import { styles as createStyles } from './PaintingCreate';



const PaintingTitle = ({ record }) => <span>修改#{record.name}信息</span>;

const styles = {
    ...createStyles,
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
};

const useStyles = makeStyles(styles);

const PaintingEdit = props => {
    const classes = useStyles();
    return (
        <Edit {...props} title={<PaintingTitle />}>
            <TabbedForm>
                <FormTab label="resources.products.tabs.image">
                    <Poster isEdit={true} />
                    <TextInput source="name" label="画作名字"/>
                    {/* <TextInput source="artistId" label="画家" fullWidth /> */}
                    <ReferenceInput source="artistId" reference="artists" label="作家名字" perPage={100}>
                    <AutocompleteInput
                        optionText={choice =>
                            `${choice.name}`
                        }
                    />
                </ReferenceInput>
                    <TextInput source="museumId" label="艺术馆" fullWidth />
                    <TextInput source="categoryStatusId" label="类别"/>
                    <StarInputField source="rating" label="打分"/>

                </FormTab>
                <FormTab label="resources.products.tabs.details" path="details">
                    <TextInput source="reference" label="参考码" />
                    <TextInput source="pin" label="二维码" />
                    <TextInput source="materialId" label="材质" />
                    <NumberInput
                        source="width"
                        className={classes.width}
                        formClassName={classes.widthFormGroup}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    cm
                                </InputAdornment>
                            ),
                        }}
                    />
                    <NumberInput
                        source="height"
                        className={classes.height}
                        formClassName={classes.heightFormGroup}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    cm
                                </InputAdornment>
                            ),
                        }}
                    />
                    {/* <ReferenceInput source="categoryId" reference="categories">
                        <SelectInput source="name" />
                    </ReferenceInput> */}
                    <TextInput source="artTypeId" label="画作风格" />
                    <TextInput source="age" label="创作年代" />
                </FormTab>
                <FormTab
                    label="resources.products.tabs.description"
                    path="description"
                >
                    
                    <RichTextInput source="sentence" label="一句话描述" />
                    <RichTextInput source="brief" label="简介" />
                    <RichTextInput source="info" label="详细信息" />
                </FormTab>
                {/* <FormTab label="resources.products.tabs.reviews" path="reviews">
                    <ReferenceManyField
                        reference="reviews"
                        target="product_id"
                        addLabel={false}
                        pagination={<Pagination />}
                        fullWidth
                    >
                        <Datagrid>
                            <DateField source="date" /> */}
                            {/* <CustomerReferenceField /> */}
                            {/* <StarRatingField /> */}
                            {/* <TextField
                                source="comment"
                                cellClassName={classes.comment}
                            />
                            <TextField source="status" />
                            <EditButton />
                        </Datagrid>
                    </ReferenceManyField> */}
                {/* </FormTab> */}
            </TabbedForm>
        </Edit>
    );
};

export default PaintingEdit;
