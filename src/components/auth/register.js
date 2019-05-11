import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import User from '../../models/user';
import { Redirect } from "react-router-dom";
import agent from '../../agent';
import {
    UPDATE_FIELD_AUTH,
    REGISTER,
    REGISTER_PAGE_UNLOADED
  } from '../../constants/actionTypes';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onSubmit: (user) => {
    const payload = agent.Auth.register(user);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: new User('email@abv.bg','Leonardo','Da Vinci','Vinci','0887667'), 
            password: '852147', 
            passwordConfirm: '852147', 
            isSubmitting: false,
            redirectToReferrer: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = (user) => ev => {
            ev.preventDefault();
            this.props.onSubmit(user);
        }
    }

    onSubmit(ev) {
       // ev.preventDefault();
        const password  =  this.state.password;
        this.props.onSubmit({ ...this.state.user, password});
        // this.setState(this.setState({isSubmitting: true}));
        // agent.Auth.register({ ...this.state.user, password})
        //     .then(result => {
        //         console.log(result);
        //         //mapDispatchToPropsl.onSubmit()
        //         this.setState({ redirectToReferrer: true });
        //     })
        //     .catch(err => {
        //     console.log(err);
        //     })
        //     .finally(() => this.setState({isSubmitting: false}));       
    }

    handleChange(event) {
        let key =  event.target.name;
        let value = event.target.value;

        this.setState(state => {
            state[key] = value;
            state.user[key] = value;
            return state;
        });   
    }

    // Synchronous validation
    validate = (values, props /* only available when using withFormik */) => {
        let errors = {};
    
        if (!values.email) {
        errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
        }
    
        //...
    
        return errors;
    };
  

    render () {
        let onSubmit = this.onSubmit;
        let user = this.state.user;
        let password = this.state.password;
        let passwordConfirm = this.state.passwordConfirm;
        let isSubmitting = this.state.isSubmitting;

        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;
    
        if (redirectToReferrer) return <Redirect to={from} />;

        return (
            <div>
                <h3>Регистрация</h3>
                <Formik
                    onSubmit={onSubmit}
                    render={({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="email">Ел. поща</label>
                            <Field type="email" value={user.email} onChange={this.handleChange} className="form-control" placeholder="Въведи ел. поща" name="email" />
                            <ErrorMessage name="email" component="div" />  
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Парола</label>
                            <Field type="password" value={password} onChange={this.handleChange} className="form-control" placeholder="Парола" name="password" />
                            <ErrorMessage name="password" component="div" />  
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordConfirm">Парола отново</label>
                            <Field type="password" value={passwordConfirm} onChange={this.handleChange} className="form-control" placeholder="Парола отново" name="passwordConfirm" />
                            <ErrorMessage name="passwordConfirm" component="div" />  
                        </div>
                        <div className="form-group">
                            <label htmlFor="fName">Име</label>
                            <Field type="text" value={user.fName} onChange={this.handleChange} className="form-control" placeholder="Име" name="fName" />
                            <ErrorMessage name="fName" component="div" />  
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Фамилия</label>
                            <Field type="text" value={user.lName} onChange={this.handleChange} className="form-control" placeholder="Фамилия" name="lName" />
                            <ErrorMessage name="lName" component="div" />  
                        </div>
                        <div className="form-group">
                            <label htmlFor="orgName">Фирма</label>
                            <Field type="text" value={user.orgName} onChange={this.handleChange} className="form-control" placeholder="Фирма" name="orgName" />
                            <ErrorMessage name="orgName" component="div" />  
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobilePhone">Телефон</label>
                            <Field type="text" value={user.mobilePhone} onChange={this.handleChange} className="form-control" placeholder="Телефон" name="mobilePhone" />
                            <ErrorMessage name="mobilePhone" component="div" />  
                        </div>
                        {status && status.msg && <div>{status.msg}</div>}
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        Регистрация
                        </button>
                    </Form>
                    )}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);