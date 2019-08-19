import React from 'react';
import * as Util from './util';
import * as actionTypes from '../../constants/actionTypes';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import agent from '../../agent';
import CustomerFormField from '../order/form-fields/customer';

const mapStateToProps = state => ({
    customer: state.customer,
    product: state.product,
    user: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
    // onChangeEmail: value =>
    //   dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
    // onChangePassword: value =>
    //   dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
    // onUnload: () =>
    //   dispatch({ type: REGISTER_PAGE_UNLOADED })
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
        super();
        this.state = {
          element: props.element,
          type: props.type,
          isSubmitting: false,
          isEdit: props.isEdit,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isEditOrAdd = this.isEditOrAdd.bind(this); 
        this.assembleFormFields = this.assembleFormFields.bind(this);
    }

    componentWillMount(){
        this.isEditOrAdd()
    }

    isEditOrAdd(){
        const id = this.props.paramID;
        if(!id) return;
        this.setState(state => {
            state.element = 
                this.props[state.type][state.type + 's'] ?
                    this.props[state.type][state.type + 's'].find(el => el._id === id) : 
                    state.element;
            state.element._id = id;
        });
    }

    onSubmit() {
        this.setState(state => {
            state.element.creator = 
                state.isEdit ? 
                    state.element.creator :
                    this.props.user._id;
            state.isSubmitting = true;
        });
        if(this.state.isEdit){
            this.props.onEdit({ ...this.state.element}, this.state.type);
        }else{
            this.props.onSubmit({ ...this.state.element}, this.state.type);
        }
    }

    handleChange(event) {
        const key = event.target.name;
        const value = event.target.value;
        this.setState(state => {
            Util.setValueFromKey(state.element, key, value);
            return state;
        });
    }

    assembleFormFields(formFields){
        return formFields.map((field,index) => {
            const value = Util.getValueFromKey(this.state.element, field.name);
            if(field.name === 'customerID'){
                return <CustomerFormField value={value} options={this.props.customer.customers} name={field.label} placeholder={field.placeholder} key={index}/>
            }else if(field.name === 'products'){
                //return <CustomerFormField value={value} name={field.label} placeholder={field.placeholder} />
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
        const isSubmitting = this.state.isSubmitting;
        const label = this.props.label;
        const formFields = this.assembleFormFields(this.props.formFields);
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