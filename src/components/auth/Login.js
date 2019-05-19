import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
//   onChangeEmail: value =>
//     dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
//   onChangePassword: value =>
//     dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends Component {

    constructor(){
        super();
        this.state = {
            email: "email@abv.bg",
            password: '852147'
         };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = (user) => ev => {
            ev.preventDefault();
            this.props.onSubmit(user);
        };
    }

    onSubmit() {
        this.props.onSubmit(this.state.email, this.state.password);
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    handleChange(event) {
        const key =  event.target.name;
        const value = event.target.value;
        this.setState(state => {
            state[key] = value;
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
        
        if (!values.password) {
            errors.password = 'Required';
        }
        //...
    
        return errors;
    };
  

    render () {
        let onSubmit = this.onSubmit;
        let email = this.state.email;
        let password = this.state.password;

        return (
            <div>
                <h3>Вход</h3>
                <Formik
                    onSubmit={onSubmit}
                    render={({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="email">Ел. поща</label>
                            <Field type="email" value={email} onChange={this.handleChange} className="form-control" placeholder="Въведи ел. поща" name="email" />
                            <ErrorMessage name="email" component="div" />  
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Парола</label>
                            <Field type="password" value={password} onChange={this.handleChange} className="form-control" placeholder="Парола" name="password" />
                            <ErrorMessage name="password" component="div" />  
                        </div>
                        {status && status.msg && <div>{status.msg}</div>}
                        <button type="submit" className="btn btn-primary" disabled={this.props.inProgress}>
                        Вход
                        </button>
                    </Form>
                    )}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);