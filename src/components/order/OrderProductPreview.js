import React from 'react';
import Input from '../common/Input';

export default class OrderProductPreview extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        orderProduct: props.orderProduct,
        isEditingInOrderMode: props.isEditingInOrderMode,
        editable: props.editable,
        onChange: props.onChange,
        onDelete: props.onDelete,
    };
    this.onSaveOrderProduct = this.onSaveOrderProduct.bind(this);
    this.onSwitchEditOrderProduct = this.onSwitchEditOrderProduct.bind(this);
    this.onDeleteOrderProduct = this.onDeleteOrderProduct.bind(this);
    this.onCancelEditOrderProduct = this.onCancelEditOrderProduct.bind(this);
  }

  onSwitchEditOrderProduct(){
    this.setState(state => state.isEditingInOrderMode = true);
  }

  onSaveOrderProduct(orderProduct){
    this.setState(state => state.isEditingInOrderMode = false);
    if(this.state.onChange){
      this.state.onChange(orderProduct, true);
    }
  }

  onDeleteOrderProduct(){
    if(this.state.onDelete){
      this.state.onDelete(this.state.orderProduct.product._id);
    }
  }

  onCancelEditOrderProduct(){
    this.setState(state => state.isEditingInOrderMode = false);
  }

  render() {
    const orderProduct = this.state.orderProduct;
    const onSwitchEditOrderProduct = this.onSwitchEditOrderProduct;
    const onSaveOrderProduct = this.onSaveOrderProduct;
    const onDeleteOrderProduct = this.onDeleteOrderProduct;
    const buttons = !this.state.editable || this.state.isEditingInOrderMode ? null :
      ( 
        <span>
          <button className="btn btn-primary" onClick={onSwitchEditOrderProduct}>Редактирай</button>
          <button className="btn btn-danger" onClick={onDeleteOrderProduct}>Изтрий</button>
        </span>
      );
    
    const formFields = [
      {
          name: 'qty', 
          label: 'Брой', 
          placeholder: 'Брой продукти',
      },
      {
          name: 'price', 
          label: 'Цена', 
          placeholder: 'Цена на продукт',
      }
    ];

    if(this.state.isEditingInOrderMode){
      const onCancelEditOrderProduct = this.onCancelEditOrderProduct;
      return (
        <Input 
          type="orderProduct"
          element={orderProduct} 
          formFields={formFields} 
          onSubmitNoDb={onSaveOrderProduct}
          onCancel={onCancelEditOrderProduct} />
      );
    }else{
      return (
        <tr className="product-preview" key={orderProduct.product._id}>
          <td>{orderProduct.product.name} </td>
          <td>{orderProduct.product.size} </td>
          <td>{orderProduct.qty} </td>
          <td>{orderProduct.price} </td>
          <td>{orderProduct.price*orderProduct.qty} </td>
          <td>{buttons}</td>
        </tr>
      );
    }
  }
}

