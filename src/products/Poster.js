import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import Zmage from 'react-zmage';

import DeleteIcon from '@material-ui/icons/Delete';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import apiUrlDefault from '../appConstant';
import { TextInput,required } from 'react-admin';

import { useField } from 'react-final-form';

const useStyles = makeStyles({
    root: { display: 'inline-block', marginTop: '1em', zIndex: 2 },
    content: { padding: 0, '&:last-child': { padding: 0 } },
    img: {
        width: 'initial',
        minWidth: 'initial',
        maxWidth: '42em',
        maxHeight: '15em',
    },
    blankImg: {
        width: '15em',
        height: '15em'
    },
    showMe: {
        position: 'absolute',
        top: '5px',
        right: '5px'
    },
    input: {
        display: 'none'
    }

});

function previewImg(imagePath){
    Zmage.browsing({
        src: imagePath, controller:
        {
            // 关闭按钮
            close: true,
            // 缩放按钮
            zoom: true,
            // 下载按钮
            download: true,
            // 旋转按钮
            rotate: false,
            // 翻页按钮
            flip: false,
            // 多页指示
            pagination: false,
        }, hotKey: {
            // 关闭（ESC）
            close: true,
            // 缩放（空格）
            zoom: true,
            // 翻页（左右）
            flip: false,
        }
    })
}

const PreviewButton = ({ imagePath }) => {

    return <Tooltip title='预览'>
        <IconButton color="secondary" aria-label="preview" onClick={() => {
           previewImg(imagePath); 
        }}>
            <VisibilityIcon />
        </IconButton>
    </Tooltip>;
}


const Poster = ({record}) => {
    const {
        input: { onChange },
        meta: { touched, error }
    } = useField('imageNo'); 
   
    const classes = useStyles();
    const [image, setImage] = useState(
        record.image
    );
    
    const [imageNo] = useState(
        record.imageNo
    ) ;

    const [uploaded, setUpLoaded] = useState (
        imageNo
    );
    
    return (
        <Card className={classes.root}>
            <CardContent className={classes.content} >
                <TextInput name="imageNo" initialValue={imageNo} className={classes.input}  onChange={onChange}
            error={!!(touched && error)} validate={required("需要上传图片")}/>
                
                <div onClick = {() => previewImg(image)} >
                <Tooltip title ="鼠标打击可查看全图">
                {uploaded ? <img src={image} alt="" className={classes.img} /> : <img src={image} alt="" className={classes.blankImg} />  }
                </Tooltip>
                </div>
                 
                <div>
                    <PreviewButton imagePath={image} />

                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                            let reader = new FileReader();
                            reader.onload = (e) => {
                                setImage(e.target.result);
                            };
                            reader.readAsDataURL(event.target.files[0]);
                            // 上传到图片服务器
                            const formData = new FormData();
                            formData.append('file', event.target.files[0]);
                            const token = localStorage.getItem('raToken');
                            fetch(`${apiUrlDefault}/upload/art`,
                                {
                                    method: 'POST',
                                    headers: {
                                        //   'Content-Type': "multipart/form-data",
                                        'Authorization': token
                                    },
                                    body: formData,
                                }

                            ).then(
                                response => response.json()
                            ).then(
                                success => {
                                    setUpLoaded(true);
                                    onChange(success.fileNo);
                                }
                            ).catch(
                                error => console.log(error)
                            );
                        };
                    }} />
                    <label htmlFor="icon-button-file">
                        <Tooltip title='修改'>
                            <IconButton color="secondary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </Tooltip>
                    </label>

               
                    {/* <Tooltip title='删除' onClick={() => { }}>
                        <IconButton color="secondary" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>  */}
                </div>
            </CardContent>

        </Card>
    );
};

export default Poster;
