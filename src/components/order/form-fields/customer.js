import React from 'react';
import SelectSearch from 'react-select-search';

export default function CustomerFormField(props){
    // const options = {
    //     className: 'customer-select'
    // };
    console.log(props);
    return <SelectSearch options={props.options} value={props.value} name={props.label} placeholder={props.placeholder} />;
    
}
