import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
const mapStateToProps = state => ({
    ...state.order,
    ...state.customer,
    ...state.product
});

class CustomerView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            products: props.products,
            orders: props.orders,
            customers: props.customers,
            customerID: props.match ? props.match.params['customerID'] : null,
            customer: null
        };
    }
    componentWillMount(){
        agent.Customer.getId(this.state.customerID).then(res => {
            if(res && res.data)
                this.setState(state => state.customer = res.data.customer);
        });
    }
    mapProductsToPrices(prices) {
        if(!prices) return [];
        return prices.map(price => { 
            price.product = this.state.products.find(product => product._id === price.productId);
            return price;
        });
    }

    renderProductPrices(prices) {
        if(!prices || prices.length === 0) return (<tr><td>'Няма данни'</td></tr>);
        return prices.map((price,key) => (
          <tr key={key}>
            <td>{price.product.name}</td>
            <td>{price.product.basePrice}</td>
            <td>{price.price}</td>
          </tr>  
        ));
    }

    render() {
        if(!this.state.customer) return (<p>Клиентът не е намерен.</p>);
        const customerName = this.state.customer.fName + ' ' + this.state.customer.lName; 
        const pricesList = this.renderProductPrices(this.mapProductsToPrices(this.state.customer.prices));
        return(
            <table className="table">
            <thead>
                <tr>
                    <th scope="col">Клиент</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{customerName}</td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th scope="col">Продукт</th>
                    <th scope="col">Базова цена</th>
                    <th scope="col">Цена за клиент</th>
                </tr>
            </thead>
            <tbody>
                {pricesList} 
            </tbody>
        </table>
        );
    }
}

export default connect(mapStateToProps, null)(CustomerView);