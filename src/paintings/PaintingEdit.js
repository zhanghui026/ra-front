import React from 'react';
import {
    Edit,
    FormTab,
    NumberInput,
    ReferenceInput,
    AutocompleteInput,
    TabbedForm,
    TextInput,
    SelectInput,
    required,
    ReferenceArrayInput,
    SelectArrayInput,
    ChipField
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
                <FormTab label="resources.paintings.tabs.image">
                    <Poster isEdit={true} />
                    <TextInput autoFocus source="name" label="画作名字" validate={required()} />
                    <ReferenceInput source="artistId" reference="artists" label="画家名字" perPage={100}>
                        <AutocompleteInput
                            optionText={choice =>
                                `${choice.name}`
                            }
                        />
                    </ReferenceInput>
                    <ReferenceInput source="museumId" reference="museums" label="艺术馆" perPage={100}>
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                    <SelectInput source="category" label = "分类" allowEmpty emptyValue={null} choices={[
                        { id: 'Character', name: '人物' },
                        { id: 'Landscape', name: '风景' },
                        { id: 'OBJECT', name: '静物' },
                        { id: 'OTHER', name: '其他' },
                    ]} />
                    <StarInputField source="rating" label="打分" />

                </FormTab>
                <FormTab label="resources.paintings.tabs.details" path="details">
                    <TextInput source="reference" label="参考码" resettable />
                    <TextInput source="pin" label="二维码" />
                    <SelectInput source="material" label = "材质" allowEmpty emptyValue={null} choices={[
                        { id: 'LINSEED_CANVAS', name: '亚麻油' },
                        { id: 'COTTON_CANVAS', name: '纯棉' },
                        { id: 'CHEMICAL_FIBER_CANVAS', name: '化纤' },
                        { id: 'COTTON_HEMP_CANVAS', name: '棉麻' },
                        { id: 'OTHER_MATERIALS_CANVAS', name: '其他' },
                    ]} />
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

            <ReferenceArrayInput reference="tags" source="tags" label="标签" >
                <SelectArrayInput optionValue="name" optionText="name">
                    <ChipField source="name" />
                </SelectArrayInput>
            </ReferenceArrayInput>
                    <TextInput source="age" label="创作年代" />
                </FormTab>
                <FormTab
                    label="resources.paintings.tabs.description"
                    path="description"
                >

                    <TextInput source="sentence" label="一句话描述" multiline resettable fullWidth />

                    <TextInput source="brief" label="简介" multiline resettable fullWidth />


                    {/* <RichTextInput source="brief" label="简介" /> */}
                    <RichTextInput source="info" label="详细信息" />
                </FormTab>
                {/* <FormTab label="resources.paintings.tabs.reviews" path="reviews">
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
