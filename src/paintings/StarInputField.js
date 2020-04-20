import React from 'react';
import Rating from '../Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useInput, required } from 'react-admin';
import { useField } from 'react-final-form';

const StarInputField = ({record}) => {

     const {
        input: { onChange },
         meta: { touched, error }
      } = useField('rating'); ;

  const [value, setValue] = React.useState(record.rating);


  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        {/* <Typography component="legend">关注度</Typography> */}
        <Rating
          // name= "rating"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            onChange(newValue);
            // props.record.rating = newValue;
          }}
        />
      </Box>
     
    </div>
  );
}

export default  StarInputField; 