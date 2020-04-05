import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import ImageField from 'react-admin';
// import EditIcon from '@material-ui/icons/Edit';;
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import Zmage from 'react-zmage';

import DeleteIcon from '@material-ui/icons/Delete';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import apiUrlDefault from '../appConstant' 
// import UploadButton from './UploadButton';

const useStyles = makeStyles({
    root: { display: 'inline-block', marginTop: '1em', zIndex: 2 },
    content: { padding: 0, '&:last-child': { padding: 0 } },
    img: {
        width: 'initial',
        minWidth: 'initial',
        maxWidth: '42em',
        maxHeight: '15em',
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

const PreviewButton = ({ imagePath }) => {

    return <Tooltip title='预览'>
        <IconButton color="secondary" aria-label="preview" onClick={() => {
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
        }}>
            <VisibilityIcon />
        </IconButton>
    </Tooltip>;
}


const Poster = ({ record }) => {
    const classes = useStyles();
    const [image, setImage] = useState(
        record.image
    );
    
    // const [imagePath, setImagePath] = useState(record.image); 
    return (
        <Card className={classes.root}>
            <CardContent className={classes.content} >
                <img src={image} alt="" className={classes.img} />
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
                           formData.append('file',event.target.files[0]);
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
                               success => console.log(success)
                           ).catch (
                               error => console.log(error)
                           );
                      } ; 
                     }} />
                    <label htmlFor="icon-button-file">
                       <Tooltip title = '修改'>
                            <IconButton color="secondary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </Tooltip>
                    </label>
                   
                    {/* <UploadButton onImageChanged = {(event) => {
                        if (event.target.files && event.target.files[0]) {
                            let reader = new FileReader();
                            reader.onload = (e) => {
                            //   this.setState({image: e.target.result});
                                setImage(e.target.result)
                            };
                            reader.readAsDataURL(event.target.files[0]);
                          } ;
                    }}> </UploadButton> */}
                    <Tooltip title='删除' onClick={() => { }}>
                        <IconButton color="secondary" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </CardContent>

        </Card>
    );
};

export default Poster;
