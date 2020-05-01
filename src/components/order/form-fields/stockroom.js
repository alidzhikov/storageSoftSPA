import React from 'react';
import SelectSearch from 'react-select-search';

export default class StockroomFormField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockrooms: props.options,
            options: props.options.map(stockroom => { 
                return { 
                    name: stockroom.name,
                    value: stockroom._id 
                }
            }),
            value: props.value,
            label: props.label,
            placeholder: props.placeholder,
        };
        this.onStockroomAdd = this.onStockroomAdd.bind(this);
    }

    onStockroomAdd(value) {
        this.props.onChange(this.state.stockrooms.find(stockroom => stockroom._id === value.value))
    }

    render(){
        const options = this.state.options;
        const value = this.props.value;
        const label = this.props.label;
        const placeholder = this.props.placeholder;
        const onStockroomAdd = this.onStockroomAdd;
        return <SelectSearch options={options} value={value} name={label} placeholder={placeholder} className="select-search-box" onChange={onStockroomAdd} />;
    }
}
