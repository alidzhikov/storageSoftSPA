import React from 'react';
import Input from '../common/Input';
import Util from './util';
import fieldTypes from '../../constants/fieldTypes';
export default class OrderProductPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderProduct: props.orderProduct,
      isEditingInOrderMode: props.isEditingInOrderMode,
      editable: props.editable,
      onChange: props.onChange,
      onDelete: props.onDelete,
      onUpdate: props.onUpdate
    };
    this.onSaveOrderProduct = this.onSaveOrderProduct.bind(this);
    this.onSwitchEditOrderProduct = this.onSwitchEditOrderProduct.bind(this);
    this.onDeleteOrderProduct = this.onDeleteOrderProduct.bind(this);
    this.onCancelEditOrderProduct = this.onCancelEditOrderProduct.bind(this);
  }

  onSwitchEditOrderProduct() {
    this.setState(state => state.isEditingInOrderMode = true);
  }

  onSaveOrderProduct(orderProduct) {
    this.setState(state => {
      state.isEditingInOrderMode = false;
      return state;
    });
    if (this.state.onChange) {
      this.state.onChange(orderProduct, true);
    }
  }

  onDeleteOrderProduct() {
    if (this.state.onDelete) {
      this.state.onDelete(this.state.orderProduct.product._id);
    }
  }

  onCancelEditOrderProduct() {
    this.setState(state => state.isEditingInOrderMode = false);
  }

  isClientPrice(orderProduct) {
    if (orderProduct.product.basePrice !== orderProduct.price) {
      return (
        <span> ({orderProduct.product.basePrice}*)</span>
      )
    }
  }

  onStocroomSelect(stockroom) {
    this.setState(state => { state.orderProduct.stockroom = stockroom; });
  }

  render() {
    const orderProduct = this.state.orderProduct;
    const isClientPrice = this.isClientPrice(orderProduct);
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
      },
      {
        name: 'stockroom',
        type: fieldTypes.STOCKROOM_FIELD,
        label: 'Склад', 
        placeholder: '',
        onChange: this.onStocroomSelect.bind(this)
      }
    ];

    if (this.state.isEditingInOrderMode) {
      const onCancelEditOrderProduct = this.onCancelEditOrderProduct;
      return (
        <Input
          type="orderProduct"
          element={orderProduct}
          formFields={formFields}
          onSubmitNoDb={onSaveOrderProduct}
          onCancel={onCancelEditOrderProduct} />
      );
    } else {
      return (
        <tr className="product-preview" key={orderProduct.product._id}>
          <td>{orderProduct.product.name}</td>
          <td>{orderProduct.product.size}</td>
          <td>{orderProduct.qty}</td>
          <td>{orderProduct.stockroom.name}</td>
          <td>
            {Util.roundToTwoString(orderProduct.price)}
            {isClientPrice}
          </td>
          <td>{Util.roundToTwoString(orderProduct.price * orderProduct.qty)} </td>
          <td>{buttons}</td>
        </tr>
      );
    }
  }
}

