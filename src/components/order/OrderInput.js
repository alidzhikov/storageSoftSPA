import React from 'react';
import Order from '../../models/order';
import OrderProduct from '../../models/orderProduct';
import Input from '../common/Input';
import OrderContent from './OrderContent';
import { connect } from 'react-redux';
import agent from '../../agent';
import { CUSTOMER_PRICES_UPDATE } from '../../constants/actionTypes';

const mapStateToProps = state => ({
    customerState: state.customer,
    orderState: state.order
});

const mapDispatchToProps = dispatch => ({
    onCustomerChange: id => {
        const payload = agent.Customer.getId(id);
        dispatch({type:  CUSTOMER_PRICES_UPDATE, payload});
        return payload;
    }
  });
class OrderInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderID: props.match.params['orderID'],
            isEdit: props.match.url.indexOf('editOrder') > -1,
            order:  new Order({}),
            customerState: props.customerState,
            orderState: props.orderState,
            type: 'order'
        }
        this.onCustomerSelect = this.onCustomerSelect.bind(this);
        this.isEditOrAdd = this.isEditOrAdd.bind(this);
        this.getFormFields = this.getFormFields.bind(this);
    }
    
    componentDidMount(){
        this.isEditOrAdd();
    }

    getFormFields(){
        const order = this.state.order;
        return [
            {
                name: 'customerID', 
                label: 'Клиент', 
                placeholder: 'Избери клиент',
                value: order ? order.customerID : null,
                onChange: this.onCustomerSelect.bind(this)
            },
            {
                name: 'products', 
                label: 'Продукти', 
                placeholder: 'Добави продукт',
                value: order ? order.orderProducts : null,
                onChange: this.onProductAddOrUpdate.bind(this)
            },
            {
                name: 'paidAmount',
                label: 'Платено',
                placeholder: 'Платена сума',
                value: order ? order.paidAmount : 0,
            }
        ];
    }

    isEditOrAdd() {
        const id = this.state.orderID;
        if(!id) return;
        this.setState(state => {
            state.order = 
                state.orderState && state.orderState.orders ?
                    state.orderState.orders.find(el => el._id === id) : 
                    state.order;
            state.order.customer = state.customerState ? state.customerState.customers.find(el => el._id === state.order.customerID) : null;
            return state;
        });

    }

    onProductAddOrUpdate(product, update = false){      
        if(!product){
            this.setState(state => state);
            return;
        }  
        const orderProduct = product instanceof OrderProduct ? product : new OrderProduct({product: product, price: product.basePrice, qty: 1});
        this.setState(state => {
            const productIndex = state.order.orderProducts.findIndex(oPr => oPr.product._id === orderProduct.product._id);
            if(productIndex > -1){
                if(update){
                    state.order.orderProducts[productIndex] = orderProduct;
                }else{
                    state.order.orderProducts[productIndex].qty = Number(state.order.orderProducts[productIndex].qty) + 1;
                }
            }else{
                state.order.orderProducts.push(orderProduct);
            }
            if(!update)
                this.onProductPriceChange(state.order.orderProducts, state.order.customer)
            return state;
        });
    }

    onProductPriceChange(orderProducts, customer) {
        if (!customer || !customer.prices) return orderProducts;
        const prices = customer.prices;
        return orderProducts.map(orderProduct => {
            const customerPrice = prices.find(price => orderProduct.product._id === price.productId);
            if (customerPrice && orderProduct.product.price !== customerPrice.price) {
                orderProduct.price = customerPrice.price;
            }    
            return orderProduct;
        });
    }

    onProductDelete(productID){
        this.setState(state => {
            state.order.orderProducts = state.order.orderProducts.filter(opr => opr.product._id !== productID);
            return state;
        });
    }

    onCustomerSelect(customer) {
        //some loader ui
        const stateCustomer = this.props.customerState.customers.find(c => c._id === customer._id);
        if (!stateCustomer.prices || stateCustomer.prices.length === 0) {
            this.props.onCustomerChange(stateCustomer._id)
                .then(res => 
                    this.setState(state => {
                        const customer = res.data.customer;
                        if(!customer) return state;                        
                        state.order.customer = customer;
                        state.order.customerID = customer._id;
                        state.order.orderProducts = this.onProductPriceChange(state.order.orderProducts, state.order.customer);
                        return state;
                    })
                );
        } else {
            this.setState(state => {
                state.order.customer = stateCustomer;
                state.order.customerID = stateCustomer._id;
                state.order.orderProducts = this.onProductPriceChange(state.order.orderProducts, state.order.customer);
                return state;
            });
        }
    }

    render(){
        const orderID = this.state.orderID;
        const isEdit = this.state.isEdit;
        const order = this.state.order;
        const type = this.state.type;
        const formFields = this.getFormFields();
        const onProductAdd = this.onProductAddOrUpdate.bind(this);
        const onProductUpdate = this.onProductAddOrUpdate.bind(this);
        const onProductDelete = this.onProductDelete.bind(this);
        return (
            <div>
                <Input 
                    type={type} 
                    element={order} 
                    formFields={formFields} 
                    paramID={orderID} 
                    isEdit={isEdit}
                    label={ (!isEdit ? 'Създай' : 'Редактирай') + ' поръчка'} />
                <OrderContent 
                    order={order} 
                    onChange={onProductAdd} 
                    onProductUpdate={onProductUpdate} 
                    onProductDelete={onProductDelete} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderInput);