import React,{ComponentType} from 'react'
import { NumberField } from 'react-admin';


const colored = (Component)  => {

    const Colored = (props) => props.record && props.source ? (
        props.record[props.source] === 0 ? (
            <span style = {{ color: 'red'}}>
                <Component {...props}></Component>
            </span>) : ( <Component {...props}> </Component>)
        )
    : null;


    Colored.displayName = `Colored(${Component.displayName})`;
    return Colored;

}
// const NumberFieldInstance = <NumberField />
const ColoredNumberField = colored(NumberField);
ColoredNumberField.defaultProps = NumberField.defaultProps;

export default ColoredNumberField;