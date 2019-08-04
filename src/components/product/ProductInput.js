import React from 'react';
import Product from '../../models/product';
import agent from '../../agent';
import { PRODUCT_ADD, PRODUCT_EDIT } from '../../constants/actionTypes';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    product: state.product,
    user: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
    // onChangeEmail: value =>
    //   dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
    // onChangePassword: value =>
    //   dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
    onEdit: product => {
        const payload = agent.Product.update(product);
        dispatch({ type: PRODUCT_EDIT, payload });
    },
    onSubmit: product => {
        const payload = agent.Product.create(product);
        dispatch({ type: PRODUCT_ADD, payload });
    }
    // onUnload: () =>
    //   dispatch({ type: REGISTER_PAGE_UNLOADED })
  });

class ProductInput extends React.Component {
    constructor() {
      super();
      this.state = {
        product: new Product("testProd " +  Date.now().toString().substr(11)+7, { $numberDecimal: Date.now().toString().substr(9)}),
        isSubmitting: false,
        isEdit: false,
      };
      this.onSubmit = this.onSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.productToEditCheck = this.productToEditCheck.bind(this);
     
    }

    componentWillMount(){
        this.productToEditCheck();
        this.setState(state => {
            state.isEdit = this.props.match.url.indexOf('editProduct') > -1;
            return state;
        });
    }
    
    productToEditCheck(){
        const id = this.props.match.params.productID;
        if(!id) return;
        this.setState(state => {
            state.product = this.props.product.products ? this.props.product.products.find(product => product._id === id) : state.product;
        });
    }

    onSubmit() {
        this.setState(state => {
            state.product.creator = this.state.isEdit ? state.product.creator : this.props.user._id;
            state.isSubmitting = true;
        });
        if(this.state.isEdit){
            this.props.onEdit({ ...this.state.product});
        }else{
            this.props.onSubmit({ ...this.state.product});
        }
    }

    handleChange(event) {
        const key =  event.target.name;
        const value = event.target.value;
        this.setState(state => {
            state.product[key] = value;
            state.product['basePrice'][key] = value;
            return state;
        });   
        
    }

    render() {
        const product = this.state.product;
        const isSubmitting = this.state.isSubmitting;
        return (
            <div>
            <h3> продукт</h3>
            <Formik
                onSubmit={this.onSubmit}
                render={({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="name">Име</label>
                            <Field type="text" value={product.name} onChange={this.handleChange} className="form-control" placeholder="" name="name" />
                            <ErrorMessage name="name" component="div" />  
                        </div>
                        <div className="form-group">
                            <label htmlFor="$numberDecimal">Цена</label>
                            <Field type="number" value={product.basePrice.$numberDecimal} onChange={this.handleChange} className="form-control" placeholder="" name="$numberDecimal" />
                            <ErrorMessage name="$numberDecimal" component="div" />  
                        </div>
                        {status && status.msg && <div>{status.msg}</div>}
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Запазване</button>
                    </Form>
                )}
            />
            </div>
        );
    }
}  

export default connect(mapStateToProps, mapDispatchToProps)(ProductInput);