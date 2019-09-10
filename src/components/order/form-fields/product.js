import React from 'react';
import SelectSearch from 'react-select-search';

export default class ProductFormField extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            products: props.options,
            options: props.options.map(product => { 
                return { 
                    name: product.name,
                    value: product._id 
                }
            }),
            value: props.value,
            label: props.label,
            placeholder: props.placeholder,
        };
        this.onProductAdd = this.onProductAdd.bind(this);
    }

    onProductAdd(value, state, props){
 //       console.log(value);
        // this.setState(state => {
        //     state.value.push(state.products.find(product => product._id === value.value));
        // });
        this.props.onChange(this.state.products.find(product => product._id === value.value))
   //     console.log(this.state.value);
    }

    render(){
        const options = this.state.options;
        const value = this.props.value;
        const label = this.props.label;
        const placeholder = this.props.placeholder;
        const onProductAdd = this.onProductAdd;
        return <SelectSearch options={options} value={value} name={label} placeholder={placeholder} className="select-search-box" onChange={onProductAdd} />;
    }
}
