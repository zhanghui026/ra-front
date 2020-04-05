import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

const UploadButton = (onImageChanged) => {
  const classes = useStyles();

  return (
    <>  
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={(event) => onImageChanged(event)} />
      <label htmlFor="icon-button-file">
        <IconButton color="secondary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </>
  );
}

export default UploadButton;