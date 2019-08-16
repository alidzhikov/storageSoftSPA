import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Register from './auth/Register';
import Login from './auth/Login';
import ProductInput from './product/ProductInput';
import ProductComponent from './product/index';
import CustomerComponent from './customer/index';
import CustomerInput from './customer/CustomerInput';
import { connect } from 'react-redux';
import { LOGOUT, REDIRECT, APP_LOAD } from '../constants/actionTypes';
import agent from '../agent';

const mapStateToProps = state => ({
    appLoaded: state.common.appLoaded,
    //appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  });
  
  const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) =>
      dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
    onRedirect: () =>
      dispatch({ type: REDIRECT }),
    onLogout: () =>
      dispatch({ type: LOGOUT })
  });

class Nav extends Component {
    
    componentWillMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        agent.setToken(user ? user.token : null);
        let props = this.props;
        setTimeout(function(){
            props.onLoad(user.currentUser, user.token);
        },500)
    }
    
    render() {
        const loggedIn = Boolean(this.props.currentUser);
        const redirect = this.props.redirectTo;
        const onLogoutCb = this.props.onLogout.bind(this);
        const user = this.props.currentUser;
        const appLoaded = this.props.appLoaded;
        if(redirect){
            this.props.onRedirect();
            return <Router><Redirect to={redirect} /></Router>;
        }
        if(!appLoaded){
            return (
                <img src="https://media.giphy.com/media/3og0IV5cAmtbkeKPBe/giphy.gif"/>
            )
        }

        return (
            <Router>
               
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">MO11</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <LoggedInMenu loggedIn={loggedIn} logoutCb={onLogoutCb} user={user}/>
                        <LoggedOutMenu loggedIn={loggedIn} />
                    </div>
                </nav>
            
                <Route path="/register" component={Register} />
                <Route path="/addProduct" component={ProductInput} />
                <Route path="/editProduct/:productID" component={ProductInput} />
                <Route path="/login" component={Login} />
                <Route path="/products" component={ProductComponent} />
                <Route path="/customers" component={CustomerComponent} />
                <Route path="/addCustomer" component={CustomerInput} />
                <Route path="/editCustomer/:customerID" component={CustomerInput} />
            </Router>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

function LoggedOutMenu(props){
    if(!props.loggedIn){
        return (
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Вход</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Регистрация</Link>
                </li>
            </ul>
        );
    }
    return null;
}

function LoggedInMenu(props){
    if(props.loggedIn){  
        const fName = props.user.fName;
        return (
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Поръчки</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/products">Продукти</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/customers">Клиенти</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link" onClick={props.logoutCb}>Изход</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">{fName}</Link>
                </li>
            </ul>
        );
    }
    return null;
}