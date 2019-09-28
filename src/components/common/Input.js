import React from 'react';
import * as Util from './util';
import * as actionTypes from '../../constants/actionTypes';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import agent from '../../agent';
import CustomerFormField from '../order/form-fields/customer';
import ProductFormField from '../order/form-fields/product';

const mapStateToProps = state => ({
    customer: state.customer,
    product: state.product,
    user: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
    onEdit: (element, type) => {
        const payload = agent[Util.firstCharToUppercase(type)].update(element);
        dispatch({ type:  actionTypes[type.toUpperCase() + '_EDIT'], payload });
    },
    onSubmit:  (element, type) => {
        const payload = agent[Util.firstCharToUppercase(type)].create(element);
        dispatch({ type: actionTypes[type.toUpperCase() + '_ADD'], payload });
    }
  });
class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elementOriginal: props.element,
            element: props.element,
            type: props.type,
            isSubmitting: false,
            isEdit: props.isEdit,
            onSubmitNoDb: props.onSubmitNoDb,
            onCancelParent: props.onCancel
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isEditOrAdd = this.isEditOrAdd.bind(this); 
        this.assembleFormFields = this.assembleFormFields.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillMount() {
        this.isEditOrAdd();
    }

    isEditOrAdd() {
        const id = this.props.paramID;
        if(!id) return;
        this.setState(state => {
            console.log(state.element);

            state.element = 
                this.props[state.type] && this.props[state.type][state.type + 's'] ?
                    this.props[state.type][state.type + 's'].find(el => el._id === id) : 
                    state.element;
            state.element._id = id;
            console.log(state.element);
            return state;
        });
    }

    onSubmit() {
        if(this.state.onSubmitNoDb){
            this.state.onSubmitNoDb(this.state.element);
        }else{
            this.setState(state => {
                state.element = this.props.element;
                state.element.creator = state.isEdit ? 
                state.element.creator : this.props.user._id;
                state.isSubmitting = true;
            });
            console.log(this.state);
            if(this.state.isEdit){
                this.props.onEdit({ ...this.state.element}, this.state.type);
            }else{
                this.props.onSubmit({ ...this.state.element}, this.state.type);
            }
        }
    }
    //remove this
    onCancel(){
        this.state.onCancelParent(this.state.elementOriginal);
    }

    handleChange(event) {  
        const key = event.target.name;
        const value = event.target.value;
        this.setState(state => {
            Util.setValueFromKey(this.props.element, key, value);
            return state;
        });
    }

    assembleFormFields(formFields) {
        return formFields.map((field,index) => {
            const value = Util.getValueFromKey(this.props.element, field.name);
            if(field.name === 'customerID'){
                return <CustomerFormField 
                    value={value} 
                    options={this.props.customer.customers} 
                    name={field.label} 
                    placeholder={field.placeholder} 
                    onChange={field.onChange} 
                    key={index}/>
            }else if(field.name === 'products' || field.name === 'product'){
                return <ProductFormField 
                    value={value} 
                    options={this.props.product.products} 
                    name={field.label} 
                    placeholder={field.placeholder} 
                    onChange={field.onChange} 
                    key={index}/>
            }
            return (
                <div className="form-group" key={index}>
                <label htmlFor={field.name}>{field.label}</label>
                <Field type="text" value={value} onChange={this.handleChange} className="form-control" placeholder={field.placeholder} name={field.name} />
                <ErrorMessage name={field.name} component="div" />  
                </div>
            );
        });
    }

    render() {
        console.log(this.props);
        const isSubmitting = this.state.isSubmitting;
        const formFields = this.assembleFormFields(this.props.formFields);
        if(this.state.onSubmitNoDb){
            const label = this.props.element.product.name;
            return (
                <tr>
                    <td>
                    <h3>{label}</h3>
                        <Formik
                            onSubmit={this.onSubmit}
                            render={({ errors, status, touched }) => (
                                <Form>
                                    {formFields}    
                                    {status && status.msg && <div>{status.msg}</div>}
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Запазване</button>
                                </Form>
                            )}
                        />
                    </td>
                </tr>
            );
        }
        const label = this.props.label;
        return (
            <div>
                <h3>{label}</h3>
                <Formik
                    onSubmit={this.onSubmit}
                    render={({ errors, status, touched }) => (
                        <Form>
                            {formFields}    
                            {status && status.msg && <div>{status.msg}</div>}
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Запазване</button>
                        </Form>
                    )}
                />
            </div>
        );
    }
}  

export default connect(mapStateToProps, mapDispatchToProps)(Input);