import React, { Component } from 'react';
import './App.css';
import Header from './component/header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './component/pages/Home';
import Footer from './component/footer/Footer';
import Login from './component/pages/Login';
import Register from './component/pages/Register';
import ErrorPage from './component/pages/ErorrPage';
import Dashboard from './component/admin/Dashboard';
import NewProduct from './component/admin/product/NewProduct';
import EditProduct from './component/admin/product/EditProduct';
import Products from './component/admin/product/Products';
import { connect } from 'react-redux';
import * as T from './redux/Types';
import Api from './inc/Api';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  componentDidMount(){
    const api = Api;
    const that = this;
    if(api.getUserToken() && api.setTokenToHeader()){
      api.post('/auth/me',{},function(res){
        if(res && res.data){
          that.props.setUser(res.data);
        }else{
          api.removeToken()
        }
      })
    }
  }
  render() {
    return (
      <Router>
        <div className="rs_app">
          <Header />
          <div className="main_section">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/admin/dashboard" component={Dashboard} />
              <Route exact path="/admin/products/:page?" component={Products} />
              <Route exact path="/admin/product/add" component={NewProduct} />
              <Route exact path="/admin/product/edit/:id" component={EditProduct} />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path='/' component={ErrorPage} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.Auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => { dispatch({ type: T.LOGIN, user: user }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
