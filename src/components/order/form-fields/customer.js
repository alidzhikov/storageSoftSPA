import React from 'react';
import SelectSearch from 'react-select-search';

export default class CustomerFormField extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            customers: props.options,
            options: props.options.map(customer => { 
                return { 
                    name: customer.fName + ' ' + customer.lName,
                    value: customer._id 
                }
            }),
        };
        this.onCustomerSelect = this.onCustomerSelect.bind(this);
    }

    onCustomerSelect(value, state, props){       
        this.props.onChange(this.state.customers.find(customer => customer._id === value.value))
    }

    render(){
        const options = this.state.options;
        const value = this.props.value;
        const label = this.props.label;
        const placeholder = this.props.placeholder;
        const onCustomerSelect = this.onCustomerSelect;
        return <SelectSearch options={options} value={value} name={label} placeholder={placeholder} onChange={onCustomerSelect} className="select-search-box"/>;
    }
}
